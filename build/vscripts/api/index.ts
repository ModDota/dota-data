import _ from 'lodash';
import { clearDescription, extractNamesFromDescription, formatArgumentName } from '../../util';
import { clientDump, DumpClass, DumpFunction, DumpMethod, serverDump } from '../dump';
import { classExtensions, extraDeclarations, functionExtensions } from './data';
import { modifierFunctionMethods } from './data/modifier-properties';
import * as apiTypes from './types';
import { checkTypes, isCompatibleOverride } from './validation';

export { types as apiTypes } from './types';

interface JoinedMethod {
  server?: DumpMethod;
  client?: DumpMethod;
}

function joinMethods(onServer: DumpMethod[], onClient: DumpMethod[]): JoinedMethod[] {
  const names = _.union(
    onClient.map((x) => x.name),
    onServer.map((x) => x.name),
  );

  return names.map((name) => ({
    server: onServer.find((x) => x.name === name),
    client: onClient.find((x) => x.name === name),
  }));
}

const defaultReplacements: Record<string, string> = {
  '<unknown>': 'unknown',
  void: 'nil',
  unsigned: 'uint',
  uint64: 'Uint64',
  utlstringtoken: 'string',
};

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const transformType = (type: string) => defaultReplacements[type] ?? type;

function overrideType(
  identifier: string,
  rawOriginal: string,
  rawOverride: _.Many<apiTypes.Type> | null | undefined,
): apiTypes.Type[] {
  const original = transformType(rawOriginal);
  if (rawOverride == null) return [original];

  const override = _.castArray(rawOverride);

  if (override.length === 1 && override[0] === original) {
    console.log(`Unnecessary type override: ${identifier}`);
  }

  for (const newType of override) {
    if (!isCompatibleOverride(original, newType)) {
      console.log(`Incompatible type override: ${identifier} ${original} -> ${newType}`);
    }
  }

  return override;
}

function transformFunction(
  scopeName: string,
  { server, client }: JoinedMethod,
): apiTypes.FunctionDeclaration {
  // Prefer server dump as it usually has more information
  const func = (server ?? client)!;
  const functionIdentifier = `${scopeName}.${func.name}`;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const extension = functionExtensions[functionIdentifier] ?? {};

  let argNames: (string | undefined)[] = [];
  if (func.args.every((x) => x.name != null)) {
    argNames = func.args.map((x) => x.name);
  } else {
    const descNames = extractNamesFromDescription(func.name, func.description);
    if (descNames) {
      if (descNames.length !== func.args.length) {
        const formattedNames = `[${descNames.join(', ')}]`;
        console.log(
          `Invalid inferred arguments: ${functionIdentifier}: ${formattedNames}, ${func.args.length} expected`,
        );
      } else {
        argNames = descNames;
      }
    }
  }

  // Few functions have description only on the client
  const originalDescription = clearDescription(func.name, func.description ?? client?.description);
  const description =
    extension.description != null
      ? extension.description !== ''
        ? typeof extension.description === 'function'
          ? extension.description(originalDescription)
          : extension.description
        : undefined
      : originalDescription;

  if (clearDescription(func.name, description) !== description) {
    throw new Error(`Unstable description: ${functionIdentifier}`);
  }

  return {
    kind: 'function',
    name: func.name,
    available: server && client ? 'both' : server ? 'server' : 'client',
    deprecated: extension.deprecated,
    description,
    returns: overrideType(`${functionIdentifier}.returns`, func.returns, extension.returns),
    args: func.args.map(
      ({ type }, index): apiTypes.FunctionParameter => {
        const [extensionName, extensionType, argDescription] = extension.args?.[index] ?? [];
        const originalName = formatArgumentName(argNames[index], index);
        const name = extensionName ?? originalName;

        if (originalName === extensionName) {
          console.log(`Unnecessary argument name override: ${functionIdentifier} ${name}`);
        }

        if (!/^\w+$/.test(name)) {
          console.log(`Invalid argument name: ${functionIdentifier} ${name}`);
        }

        let types = overrideType(`${functionIdentifier}.args.${name}`, type, extensionType);
        if (
          name.toLowerCase().endsWith('playerid') &&
          _.isEqual(types, ['int']) &&
          !/^CDOTA_PlayerResource\.IsValid(Team)?Player(ID)?$/.test(functionIdentifier)
        ) {
          types = ['PlayerID'];
        }

        return { name, description: argDescription, types };
      },
    ),
  };
}

function transformClass(serverClass: DumpClass): apiTypes.ClassDeclaration {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const extension = classExtensions[serverClass.name] ?? {};
  const clientClass = clientDump.find(
    (x): x is DumpClass => x.name.replace(/^C_/, 'C') === serverClass.name,
  );

  const members = [
    ...(extension.members ?? []),
    ...joinMethods(serverClass.members, clientClass?.members ?? []).map((joinedMethods) =>
      transformFunction(serverClass.name, joinedMethods),
    ),
  ];

  if (serverClass.name === 'CDOTA_Modifier_Lua') {
    members.push(...modifierFunctionMethods);
  }

  const isAbstract = (member: apiTypes.ClassMember) => 'abstract' in member && member.abstract;
  return {
    kind: 'class',
    name: serverClass.name,
    clientName: clientClass?.name,
    description: extension.description,
    extend: serverClass.extend,
    instance: serverClass.instance,
    members: members
      .sort((a, b) => a.name.localeCompare(b.name, 'en'))
      .sort((a, b) =>
        isAbstract(a) && !isAbstract(b) ? 1 : !isAbstract(a) && isAbstract(b) ? -1 : 0,
      ),
  };
}

export const apiDeclarations: apiTypes.Declaration[] = [
  ...extraDeclarations,
  ...serverDump.filter((x): x is DumpClass => x.kind === 'class').map(transformClass),
  ...joinMethods(
    serverDump.filter((x): x is DumpFunction => x.kind === 'function'),
    clientDump.filter((x): x is DumpFunction => x.kind === 'function'),
  ).map((joinedMethods) => transformFunction('_G', joinedMethods)),
].sort((a, b) => a.kind.localeCompare(b.kind) || a.name.localeCompare(b.name));

export function validateApi() {
  function checkFunctionDeclaration(func: apiTypes.FunctionDeclaration, scopeName = '_G') {
    const identifier = `${scopeName}.${func.name}`;
    checkTypes(`${identifier}.returns`, func.returns);
    for (const arg of func.args) {
      checkTypes(`${identifier}.args.${arg.name}`, arg.types);
    }
  }

  for (const declaration of apiDeclarations) {
    if (declaration.kind === 'function') {
      checkFunctionDeclaration(declaration);
      continue;
    }

    for (const member of declaration.members) {
      if (member.kind === 'function') {
        checkFunctionDeclaration(member, declaration.name);
      } else {
        checkTypes(`${declaration.name}.${member.name}`, member.types);
      }
    }
  }
}
