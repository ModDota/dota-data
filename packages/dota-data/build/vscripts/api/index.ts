import _ from 'lodash';
import { clearDescription, extractNamesFromDescription, formatArgumentName } from '../../util';
import { DumpClass, DumpFunction, DumpMethod } from '../types';
import { readVScriptsDump } from '../util';
import { attachedTypes, classExtensions, functionExtensions } from './data';
import { Class, FunctionDeclaration, Parameter } from './types';

export { types as apiTypes } from './types';

const defaultReplacements: Record<string, string> = {
  '<unknown>': 'unknown',
  void: 'nil',
  unsigned: 'uint',
  uint64: 'Uint64',
  utlstringtoken: 'string',
};

export async function generateApi(replacements: Record<string, string>) {
  const dump = await readVScriptsDump();

  interface JoinedMethod {
    server?: DumpMethod;
    client?: DumpMethod;
  }

  const transformType = (type: string) => replacements[type] || defaultReplacements[type] || type;
  function transformFunction(
    scopeName: string,
    { server, client }: JoinedMethod,
  ): FunctionDeclaration {
    // Prefer server dump as it usually has more information
    const func = (server || client)!;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const extension = functionExtensions[`${scopeName}.${func.name}`] || {};
    let argNames: (string | undefined)[];
    if (func.args.every(x => x.name != null)) {
      argNames = func.args.map(x => x.name);
    } else {
      const descNames = extractNamesFromDescription(func.name, func.description);
      if (descNames && descNames.length !== func.args.length) {
        throw new Error(
          `${func.name} has invalid arguments (${descNames.length} and ${func.args.length})`,
        );
      }

      argNames = descNames || [];
    }

    const originalDescription = clearDescription(func.name, func.description);
    const description =
      extension.description != null
        ? extension.description !== ''
          ? typeof extension.description === 'function'
            ? extension.description(originalDescription)
            : extension.description
          : undefined
        : originalDescription;

    if (clearDescription(func.name, description) !== description) {
      throw new Error(`Description of ${scopeName}.${func.name} is invalid:\n${description}`);
    }

    return {
      kind: 'function',
      name: func.name,
      available: server && client ? 'both' : server ? 'server' : 'client',
      deprecated: extension.deprecated,
      description,
      returns: _.castArray(extension.returns || transformType(func.returns)),
      args: func.args.map(
        ({ type }, index): Parameter => {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          const argExtension = (extension.args || {})[index] || [];
          const name = argExtension[0] || formatArgumentName(argNames[index], index);
          const argDescription = _.defaultTo(argExtension[2], undefined);

          let types = _.castArray(argExtension[1] || transformType(type));
          if (name.toLowerCase().endsWith('playerid') && _.isEqual(types, ['int'])) {
            types = ['PlayerID'];
          }

          if (!/^\w+$/.test(name)) {
            throw new Error(`Argument name "${name}" (${scopeName}.${func.name}) is invalid`);
          }

          return { name, description: argDescription, types };
        },
      ),
    };
  }

  function joinMethods(onServer: DumpMethod[], onClient: DumpMethod[]): JoinedMethod[] {
    const names = _.union(
      onClient.map(x => x.name),
      onServer.map(x => x.name),
    );

    return names.map(name => ({
      server: onServer.find(x => x.name === name),
      client: onClient.find(x => x.name === name),
    }));
  }

  return [
    ...joinMethods(
      dump.server.filter((x): x is DumpFunction => x.kind === 'function'),
      dump.client.filter((x): x is DumpFunction => x.kind === 'function'),
    ).map(result => transformFunction('_G', result)),

    ...dump.server
      .filter((x): x is DumpClass => x.kind === 'class')
      .map(
        (serverClass): Class => {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          const extension = classExtensions[serverClass.name] ?? {};
          const clientClass = dump.client.find(
            (x): x is DumpClass => x.name.replace(/^C_/, 'C') === serverClass.name,
          );

          const members = [
            ...joinMethods(
              serverClass.members,
              clientClass ? clientClass.members : [],
            ).map(result => transformFunction(serverClass.name, result)),
            ...(extension.members ?? []),
          ];

          return {
            kind: 'class',
            name: serverClass.name,
            clientName: clientClass != null ? clientClass.name : undefined,
            description: extension.description,
            extend: serverClass.extend,
            instance: serverClass.instance,
            members: members.sort((a, b) => a.name.localeCompare(b.name, 'en')),
          };
        },
      ),

    ...attachedTypes,
  ].sort((a, b) => a.kind.localeCompare(b.kind) || a.name.localeCompare(b.name));
}
