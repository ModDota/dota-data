import { readDump } from '../../util';
import { modifierPropertyData } from '../../vscripts/modifier-properties/data';
import { Enum, EnumMember } from './types';

export { types as enumsTypes } from './types';

export const enums = (() => {
  const result = readDump('cl_panorama_script_help *')
    .split('\n\n')
    .map(
      (group): Enum => {
        const enumName = group.match(/Enumeration '(.+?)'/)![1];
        const members = [...group.matchAll(/^\t.+\.(.+?) = (\d+)(?: \((.+)\))?$/gm)].map(
          ([, name, value, description]): EnumMember => ({
            name,
            description,
            value: Number(value),
          }),
        );

        return { name: enumName, members };
      },
    );

  for (const member of result.find(x => x.name === 'modifierfunction')!.members) {
    if (!member.description || member.description === 'Unused') continue;
    member.description = modifierPropertyData[member.description]?.[2]
      ? `${modifierPropertyData[member.description][2]}\n\nMethod Name: \`${member.description}\`.`
      : `Method Name: \`${member.description}\``;
  }

  return result;
})();
