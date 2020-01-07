import assert from 'assert';
import _ from 'lodash';
import { clientDump, DumpConstant, serverDump } from '../dump';
import { modifierPropertyData } from '../modifier-properties/data';
import {
  droppedConstants,
  enumValueDescriptions,
  extractedConstants,
  globalEnums,
  MemberNameNormalizer,
  memberNameNormalizers,
  normalizedEnumNames,
  prefixedEnums,
} from './data';
import { Availability, Constant, Enum, EnumMember } from './types';

export { types as enumsTypes } from './types';

function findCommonStart(strings: string[]) {
  if (strings.length < 2) return '';
  return strings.slice(1).reduce((common, string) => {
    while (!string.startsWith(common)) {
      common = common.slice(0, -1);
    }

    return common;
  }, strings[0]);
}

function normalizeEnumName(raw: string) {
  const normalized = raw.startsWith('modifier')
    ? `Modifier${_.upperFirst(raw.slice('modifier'.length))}`
    : _.upperFirst(_.camelCase(raw.replace(/(^E?(DOTA|Dota)_?|_t$)/g, '')));

  if (normalizedEnumNames[raw] != null) {
    if (normalizedEnumNames[raw] === normalized) {
      console.warn(`Unnecessary enum normalization override: ${raw} -> ${normalized}`);
    }

    return normalizedEnumNames[raw];
  }

  return normalized;
}

export const enumDeclarations = (() => {
  const serverGlobals = serverDump.filter((x): x is DumpConstant => x.kind === 'constant');
  const clientGlobals = clientDump.filter((x): x is DumpConstant => x.kind === 'constant');
  let allGlobals = [
    ...serverGlobals,
    ...clientGlobals.filter(cc => !serverGlobals.some(sc => sc.name === cc.name)),
  ].filter(({ name }) => !droppedConstants.includes(name));
  const takeGlobals = (filter: (name: DumpConstant) => boolean) => {
    const [extracted, rest] = _.partition(allGlobals, filter);
    assert(extracted.length > 0);
    allGlobals = rest;
    return extracted;
  };

  // Make sure that all there are no different constants on client and server
  for (const { name } of allGlobals) {
    const server = serverGlobals.find(x => x.name === name);
    const client = serverGlobals.find(x => x.name === name);
    if (server == null) {
      console.error(`Available only on client: ${name}`);
      continue;
    }

    if (client == null) continue;
    if (client.value !== server.value || client.description !== server.description) {
      throw new Error(`${name} exists on server and client, but has different values`);
    }
  }

  const getAvailability = (n: string): Availability =>
    clientGlobals.some(x => x.name === n) ? 'both' : 'server';

  const constants = takeGlobals(x => extractedConstants.includes(x.name))
    .map(
      ({ name, description, value }): Constant => ({
        kind: 'constant',
        name,
        description,
        value,
        available: getAvailability(name),
      }),
    )
    .sort((a, b) => a.name.localeCompare(b.name, 'en'));

  const transformMembers = (
    members: DumpConstant[],
    common?: string,
    normalizer?: MemberNameNormalizer,
  ) =>
    members
      .map(
        ({ name, description, value }): EnumMember => {
          let normalizedName = name;
          if (common != null) normalizedName = normalizedName.replace(common, '');
          normalizedName = _.snakeCase(normalizedName).toUpperCase();
          if (normalizer != null) normalizedName = normalizer({ name, normalizedName });

          return { name, normalizedName, description, value };
        },
      )
      .sort((a, b) => a.value - b.value);

  const getCommonAvailability = (members: DumpConstant[]) => {
    const memberAvailability = members.map(({ name }) => getAvailability(name));
    if (memberAvailability.every(x => x === memberAvailability[0])) return memberAvailability[0];

    throw new Error('Enum has members with different availability');
  };

  const enums: Enum[] = [];

  enums.push(
    ...Object.entries(prefixedEnums).map(
      ([name, prefix]): Enum => {
        const members = takeGlobals(x => x.name.startsWith(prefix));
        return {
          kind: 'enum',
          name,
          normalizedName: normalizeEnumName(name),
          available: getCommonAvailability(members),
          members: transformMembers(members, prefix),
        };
      },
    ),
  );

  enums.push(
    ...Object.entries(globalEnums).map(
      ([name, values]): Enum => {
        const members = takeGlobals(x => values.includes(x.name));
        return {
          kind: 'enum',
          name,
          normalizedName: normalizeEnumName(name),
          available: getCommonAvailability(members),
          members: transformMembers(members),
        };
      },
    ),
  );

  enums.push(
    ...Object.entries(
      _.groupBy(
        takeGlobals(x => x.enum != null),
        x => x.enum!,
      ),
    ).map(
      ([name, members]): Enum => {
        const common = findCommonStart(members.map(x => x.name));
        return {
          kind: 'enum',
          name,
          normalizedName: normalizeEnumName(name),
          available: getCommonAvailability(members),
          members: transformMembers(members, common, memberNameNormalizers[name]),
        };
      },
    ),
  );

  for (const constant of allGlobals) {
    console.log(`Unknown constant or enum: ${constant.name}`);
  }

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

  for (const member of enums.find(x => x.name === 'modifierfunction')!.members) {
    if (!member.description || member.description === 'Unused') continue;
    member.description = modifierPropertyData[member.description]?.[2]
      ? `${modifierPropertyData[member.description][2]}\n\nMethod Name: \`${member.description}\`.`
      : `Method Name: \`${member.description}\``;
  }

  enums.sort((a, b) => a.name.localeCompare(b.name, 'en'));
  return [...constants, ...enums];
})();
