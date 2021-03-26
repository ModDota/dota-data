import { readDump } from '../../util';
import { getEnumDescription } from '../../vscripts/api/data/modifier-properties';
import { Enum, EnumMember } from './types';

export { types as enumsTypes } from './types';

export const enums = (() => {
  const result = readDump('cl_panorama_script_help *')
    .split(/\r?\n\r?\n/)
    .map(
      (group): Enum => {
        const enumName = group.match(/Enumeration '(.+?)'/)![1];
        const members = [...group.matchAll(/^\t.+\.(.+?) = (-?\d+)(?: \((.+)\))?$/gm)].map(
          ([, name, value, description]): EnumMember => ({
            name,
            description,
            value: Number(value),
          }),
        );

        return { name: enumName, members };
      },
    );

  for (const member of result.find((x) => x.name === 'modifierfunction')!.members) {
    member.description = getEnumDescription(member.description);
  }

  return result;
})();
