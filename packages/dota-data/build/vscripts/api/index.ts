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

  const transformType = (type: string) => replacements[type] || defaultReplacements[type] || type;
  function transformFunction(
    scopeName: string,
    func: DumpMethod,
    client: boolean,
  ): FunctionDeclaration {
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

    const description =
      extension.description != null
        ? extension.description !== ''
          ? extension.description
          : undefined
        : clearDescription(func.name, func.description);
    if (clearDescription(func.name, description) !== description) {
      throw new Error(`Description of ${scopeName}.${func.name} is invalid:\n${description}`);
    }

    return {
      kind: 'function',
      name: func.name,
      available: client ? 'both' : 'server',
      deprecated: extension.deprecated,
      description,
      returns: _.castArray(extension.returns || transformType(func.returns)),
      args: func.args.map(
        ({ type }, i): Parameter => {
          const argExtension = (extension.args || {})[i] || [];
          const name = argExtension[0] || formatArgumentName(argNames[i], i);
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

  const clientFunctions = dump.client.filter((x): x is DumpFunction => x.kind === 'function');
  return [
    ...dump.server
      .filter((x): x is DumpFunction => x.kind === 'function')
      .map(func => transformFunction('_G', func, clientFunctions.some(x => x.name === func.name))),
    ...dump.server
      .filter((x): x is DumpClass => x.kind === 'class')
      .map(
        (serverClass): Class => {
          const extension = classExtensions[serverClass.name] || {};
          const clientClass = dump.client.find(
            (x): x is DumpClass => x.name.replace(/^C_/, 'C') === serverClass.name,
          );

          return {
            kind: 'class',
            name: serverClass.name,
            clientName: clientClass != null ? clientClass.name : undefined,
            description: extension.description,
            extend: serverClass.extend,
            instance: serverClass.instance,
            members: serverClass.members
              .map(func =>
                transformFunction(
                  serverClass.name,
                  func,
                  clientClass != null && clientClass.members.some(x => x.name === func.name),
                ),
              )
              .sort((a, b) => a.name.localeCompare(b.name, 'en')),
          };
        },
      ),
    ...attachedTypes,
  ].sort((a, b) => a.kind.localeCompare(b.kind) || a.name.localeCompare(b.name));
}