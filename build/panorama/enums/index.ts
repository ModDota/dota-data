import { readDump } from '../../util';
import { getEnumDescription } from '../../vscripts/api/data/modifier-properties';
import { Availability, Declaration, Enum, EnumMember } from './types';

export { types as enumsTypes } from './types';

export const enums = (() => {
  const result = readDump('cl_panorama_script_help *')
    .split(/\r?\n\r?\n/)
    .map((group): Enum => {
      const enumName = group.match(/declare enum (.+)([\s{]*)?/)![1];
      const members: EnumMember[] = [];

      let currentComment: string | undefined;

      for (const line of group.slice(group.indexOf('{')).split('\n')) {
        const comment = line.match(/\/\*\* (.+) \*\//); 
        if (comment) {
          [, currentComment] = comment;
        }

        const member = line.match(/(\w+) = (-?\d+)/);
        if (member) {
          members.push({
            name: member[1],
            description: currentComment,
            value: Number(member[2]),
          });

          currentComment = undefined;
        }
      }

      return { 
        kind: 'enum',
        name: enumName, 
        available: 'both' as Availability, // 默认为both，因为这是panorama枚举
        members 
      };
    });

  for (const member of result.find((x) => x.name === 'modifierfunction')!.members) {
    member.description = getEnumDescription(member.description);
  }

  // 按名称排序，与vscripts保持一致
  result.sort((a, b) => a.name.localeCompare(b.name, 'en'));

  return result as Declaration[];
})();
