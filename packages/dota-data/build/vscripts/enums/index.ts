import _ from 'lodash';
import { modifierPropertyData } from '../modifier-properties/data';
import { DumpConstant } from '../types';
import { readVScriptsDump } from '../util';
import {
  droppedConstants,
  enumRenames,
  enumValueDescriptions,
  extractedConstants,
  globalEnums,
  KeyTransformer,
  keyTransformers,
  prefixedEnums,
} from './data';
import { Availability, Constant, Enum, EnumMember } from './types';

export { types as enumsTypes } from './types';

function commonStart(strings: string[]) {
  if (strings.length < 2) return '';
  return strings.slice(1).reduce((common, string) => {
    while (!string.startsWith(common)) {
      common = common.slice(0, -1);
    }

    return common;
  }, strings[0]);
}

function normalizeScopeName(s: string) {
  if (enumRenames[s] != null) return enumRenames[s];
  if (s.startsWith('modifier')) return `Modifier${_.upperFirst(s.slice(8))}`;
  return _.upperFirst(_.camelCase(s.replace(/(^E?(DOTA|Dota)_?|_t$)/g, '')));
}

export async function generateEnums() {
  const dump = await readVScriptsDump();
  const serverConstants = dump.server.filter((x): x is DumpConstant => x.kind === 'constant');
  const clientConstants = dump.client.filter((x): x is DumpConstant => x.kind === 'constant');
  const allConstants = [
    ...serverConstants,
    ...clientConstants.filter(cc => !serverConstants.some(sc => sc.name === cc.name)),
  ].filter(({ name }) => !droppedConstants.includes(name));

  // Make sure that all there are no different constants on client and server
  allConstants.forEach(({ name }) => {
    const server = serverConstants.find(x => x.name === name);
    const client = serverConstants.find(x => x.name === name);
    if (server == null) {
      console.error(`Available only on client: ${name}`);
      return;
    }

    if (client == null) return;
    if (client.value !== server.value || client.description !== server.description) {
      throw new Error(`${name} exists on server and client, but has different values`);
    }
  });

  const getAvailability = (n: string): Availability =>
    clientConstants.some(x => x.name === n) ? 'both' : 'server';

  const constants = allConstants
    .filter(x => extractedConstants.includes(x.name) || x.enum === 'DOTALimits_t')
    .map(
      (c): Constant => ({
        kind: 'constant',
        name: c.name,
        description: c.description,
        value: c.value,
        available: getAvailability(c.name),
      }),
    )
    .sort((a, b) => a.name.localeCompare(b.name, 'en'));

  const transformMembers = (members: DumpConstant[], common?: string, kt?: KeyTransformer) =>
    members
      .map(
        ({ name: originalName, description, value }): EnumMember => {
          let name = originalName;
          if (common != null) name = name.replace(common, '');
          name = _.snakeCase(name).toUpperCase();
          if (kt != null) name = kt({ name, originalName });
          return {
            originalName,
            name,
            description,
            value,
          };
        },
      )
      .sort((a, b) => a.value - b.value);

  const getEnumAvailability = (members: DumpConstant[]) => {
    const memberAvailability = members.map(({ name }) => getAvailability(name));
    if (memberAvailability.every(x => x === memberAvailability[0])) return memberAvailability[0];

    throw new Error('Enum has members with different availability');
  };

  const enums: Enum[] = [
    ...prefixedEnums.map(
      (prefix): Enum => {
        const members = allConstants.filter(x => x.name.startsWith(prefix));
        return {
          kind: 'enum',
          name: normalizeScopeName(prefix),
          available: getEnumAvailability(members),
          members: transformMembers(members, prefix),
        };
      },
    ),
    ...Object.entries(globalEnums).map(
      ([name, values]): Enum => ({
        kind: 'enum',
        name,
        available: getEnumAvailability(allConstants.filter(x => values.includes(x.name))),
        members: transformMembers(allConstants.filter(x => values.includes(x.name))),
      }),
    ),
    ...[
      ['ModifierProperty', 'MODIFIER_PROPERTY_'],
      ['ModifierEvent', 'MODIFIER_EVENT_'],
    ].map(
      ([name, prefix]): Enum => ({
        kind: 'enum',
        name,
        available: getEnumAvailability(allConstants.filter(x => x.name.startsWith(prefix))),
        members: [
          ...transformMembers(
            allConstants.filter(x => x.name.startsWith(prefix)),
            prefix,
          ).map((x): typeof x => ({
            ...x,
            description:
              x.description && x.description !== 'Unused'
                ? // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                  modifierPropertyData[x.description] && modifierPropertyData[x.description][2]
                  ? `${modifierPropertyData[x.description][2]}\n\nMethod Name: \`${x.description}\``
                  : `Method Name: \`${x.description}\``
                : undefined,
          })),
          ...transformMembers(
            allConstants.filter(x => x.name === 'MODIFIER_FUNCTION_INVALID'),
            'MODIFIER_FUNCTION_',
          ),
        ],
      }),
    ),
  ];

  enums.push(
    ...Object.entries(
      allConstants
        .filter(c => !constants.some(x => x.name === c.name))
        .filter(c => !enums.some(x => x.members.some(m => m.originalName === c.name)))
        .reduce<Record<string, DumpConstant[]>>((documentedEnums, c) => {
          if (c.enum != null) {
            if (documentedEnums[c.enum] == null) documentedEnums[c.enum] = [];
            documentedEnums[c.enum].push(c);
          } else {
            console.log(`Unknown constant or enum: ${c.name}`);
          }

          return documentedEnums;
        }, {}),
    ).map(
      ([scopeName, members]): Enum => {
        const common = commonStart(members.map(x => x.name));
        const normalizedScope = normalizeScopeName(scopeName);
        return {
          kind: 'enum',
          name: normalizedScope,
          originalName: scopeName,
          available: getEnumAvailability(members),
          members: transformMembers(members, common, keyTransformers[normalizedScope]),
        };
      },
    ),
  );

  enums.sort((a, b) => a.name.localeCompare(b.name, 'en'));

  _.each(enumValueDescriptions, (descriptions, scopeName) => {
    const enumValue = enums.find(x => x.name === scopeName);
    if (enumValue == null) throw new Error(`Enum ${scopeName} not found`);
    _.each(descriptions, (description, memberName) => {
      if (memberName === '__self') {
        enumValue.description = description;
      } else {
        enumValue.members.find(x => x.name === memberName)!.description = description;
      }
    });
  });

  // TODO: API doesn't seem to have any references to enums
  const replacements = _.mapValues(
    _.groupBy(
      enums.filter(x => x.originalName),
      x => x.originalName,
    ),
    value => value.map(x => x.name).join(' | '),
  );

  return { declarations: [...constants, ...enums], replacements };
}
