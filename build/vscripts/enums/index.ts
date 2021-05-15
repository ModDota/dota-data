import assert from 'assert';
import _ from 'lodash';
import { getEnumDescription } from '../api/data/modifier-properties';
import { clientDump, DumpConstant, serverDump } from '../dump';
import {
  droppedConstants,
  enumValueDescriptions,
  extractedConstants,
  globalEnums,
  prefixedEnums,
} from './data';
import { Availability, Constant, Enum, EnumMember } from './types';

export { types as enumsTypes } from './types';

export const enumDeclarations = (() => {
  const serverGlobals = serverDump.filter((x): x is DumpConstant => x.kind === 'constant');
  const clientGlobals = clientDump.filter((x): x is DumpConstant => x.kind === 'constant');
  let allGlobals = [
    ...serverGlobals,
    ...clientGlobals.filter((cc) => !serverGlobals.some((sc) => sc.name === cc.name)),
  ].filter(({ name }) => !droppedConstants.includes(name));
  const takeGlobals = (filter: (name: DumpConstant) => boolean) => {
    const [extracted, rest] = _.partition(allGlobals, filter);
    assert(extracted.length > 0);
    allGlobals = rest;
    return extracted;
  };

  // Make sure that all there are no different constants on client and server
  for (const { name } of allGlobals) {
    const server = serverGlobals.find((x) => x.name === name);
    const client = serverGlobals.find((x) => x.name === name);
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
    clientGlobals.some((x) => x.name === n) ? 'both' : 'server';

  const constants = takeGlobals((x) => extractedConstants.includes(x.name))
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

  const transformMembers = (members: DumpConstant[]) =>
    members
      .map(({ name, description, value }): EnumMember => ({ name, description, value }))
      .sort((a, b) => a.value - b.value);

  const getCommonAvailability = (members: DumpConstant[]) => {
    const memberAvailability = members.map(({ name }) => getAvailability(name));
    if (memberAvailability.every((x) => x === memberAvailability[0])) return memberAvailability[0];

    throw new Error('Enum has members with different availability');
  };

  const enums: Enum[] = [];

  enums.push(
    ...Object.entries(prefixedEnums).map(([name, prefix]): Enum => {
      const members = takeGlobals((x) =>
        typeof prefix === 'string' ? x.name.startsWith(prefix) : prefix.test(x.name),
      );

      return {
        kind: 'enum',
        name,
        available: getCommonAvailability(members),
        members: transformMembers(members),
      };
    }),
  );

  enums.push(
    ...Object.entries(globalEnums).map(([name, values]): Enum => {
      const members = takeGlobals((x) => values.includes(x.name));
      return {
        kind: 'enum',
        name,
        available: getCommonAvailability(members),
        members: transformMembers(members),
      };
    }),
  );

  enums.push(
    ...Object.entries(
      _.groupBy(
        takeGlobals((x) => x.enum != null),
        (x) => x.enum!,
      ),
    ).map(
      ([name, members]): Enum => ({
        kind: 'enum',
        name,
        available: getCommonAvailability(members),
        members: transformMembers(members),
      }),
    ),
  );

  for (const constant of allGlobals) {
    console.log(`Unknown constant or enum: ${constant.name}`);
  }

  _.each(enumValueDescriptions, (descriptions, scopeName) => {
    const enumValue = enums.find((x) => x.name === scopeName);
    if (enumValue == null) throw new Error(`Enum ${scopeName} not found`);
    _.each(descriptions, (description, memberName) => {
      if (memberName === '__self') {
        enumValue.description = description;
      } else {
        enumValue.members.find((x) => x.name === memberName)!.description = description;
      }
    });
  });

  for (const member of enums.find((x) => x.name === 'modifierfunction')!.members) {
    member.description = getEnumDescription(member.description);
  }

  enums.sort((a, b) => a.name.localeCompare(b.name, 'en'));
  return [...constants, ...enums];
})();
