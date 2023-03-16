import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import { outputFile, outputJson } from '../util';
import { extracted, additionalEnums } from './data';
import { EngineEnum, EngineEnumMember, types } from './types';

const identity = <T>(value: T) => value;

export async function generateEngineEnums(dota2Dir: string) {
  const strings: string[] = scanFileForStrings(
    path.join(dota2Dir, 'game', 'dota', 'bin', 'win64', 'server.dll'),
  );

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

      const members = selectedStrings.map(
        (x): EngineEnumMember => ({ name: x, shortName: map(x) }),
      );
      members.sort((a, b) => a.name.localeCompare(b.name));

      return {
        name,
        members: transform(members),
      };
    },
  );

  for (const additionalEnum of additionalEnums) {
    if (enums.find((e) => e.name === additionalEnum.name) !== undefined) {
      throw new Error(
        `Additional supplied enum ${additionalEnum.name} overrides already existing engine enum.`,
      );
    } else {
      enums.push(additionalEnum);
    }
  }

  await Promise.all([outputJson('engine-enums', enums), outputFile('engine-enums.d.ts', types)]);
}

function scanFileForStrings(path: string): string[] {
  const result = [];
  const buffer = fs.readFileSync(path);

  let i = 0;
  let start = 0;
  const MIN_STRING_LENGTH = 5;
  while (i < buffer.length) {
    if (buffer[i] < 32) {
      if (i - start >= MIN_STRING_LENGTH) {
        result.push(buffer.toString(undefined, start, i));
      }
      start = i + 1;
    }
    ++i;
  }

  return result;
}
