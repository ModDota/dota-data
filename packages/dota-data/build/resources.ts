import got from 'got';
import _ from 'lodash';
import { outputFile, outputJson } from './util';

const groups = ['materials', 'models', 'particles', 'soundevents', 'sounds'];
const sources = [
  'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/core/pak01_dir.txt',
  'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota/pak01_dir.txt',
];

export async function generateResources() {
  const fileGroups: Record<string, string[]> = _.mapValues(_.keyBy(groups), () => []);

  await Promise.all(
    sources.map(async sourceUrl => {
      const lines = (await got(sourceUrl)).body.split('\n');
      lines.forEach(line => {
        const group = groups.find(x => line.startsWith(x + '/'));
        if (group) {
          const fileName = line.substring(0, line.indexOf(' '));
          fileGroups[group].push(fileName);
        }
      });
    }),
  );

  fileGroups.models.unshift('models/error.vmdl_c');

  await Promise.all(
    Object.entries(fileGroups).map(([group, files]) =>
      Promise.all([
        outputJson(`resources/${group}`, files),
        outputFile(`resources/${group}.d.ts`, `declare const file: string[];\nexport = file;`),
      ]),
    ),
  );
}
