import _ from 'lodash';
import { getDotaFile, outputFile, outputJson } from '../util';
import { extracted } from './data';
import { EngineEnum, EngineEnumMember, types } from './types';

const identity = <T>(value: T) => value;

export async function generateEngineEnums() {
  const strings = (await getDotaFile('bin/linuxsteamrt64/libserver_strings.txt')).split('\n');
  const usedStrings = new Map<string, string>();
  const enums = extracted.map(
    ({ name, prefix, filter = () => true, map = identity, transform = identity }): EngineEnum => {
      if (!name) {
        if (prefix) {
          name = _.upperFirst(_.camelCase(prefix.replace(/^DOTA_/, '')));
        } else {
          throw new Error('Extracted enum has no name or prefix defined.');
        }
      }

      if (map === identity && prefix) {
        map = (value: string) => value.replace(prefix, '');
      }

      const selectedStrings = (prefix ? strings.filter((x) => x.startsWith(prefix)) : strings)
        .filter((x) => !x.includes(' ') && !x.endsWith('_TYPES') && !x.endsWith('_TYPE'))
        .filter(filter);
      if (selectedStrings.length === 0) throw new Error(`Enum "${name}" has no matching values.`);

      for (const string of selectedStrings) {
        if (usedStrings.has(string)) {
          throw new Error(
            `Enum "${name}" can't use string "${string}" used by ${usedStrings.get(string)}`,
          );
        }

        usedStrings.set(string, name);
      }

      return {
        name,
        members: transform(
          selectedStrings.map((x): EngineEnumMember => ({ name: x, shortName: map(x) })),
        ),
      };
    },
  );

  await Promise.all([outputJson('engine-enums', enums), outputFile('engine-enums.d.ts', types)]);
}
