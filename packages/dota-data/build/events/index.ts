import assert from 'assert';
import _ from 'lodash';
import { formatDescription, getFile, outputFile, outputJson } from '../util';
import { extraEventFields } from './data';
import { Event, types } from './types';

function parseFile(content: string) {
  const events: Record<string, Event> = {};
  let parsingName: string | undefined;

  content
    .split('\n')
    .filter(value => value.match(/^(\t*)/)![0].length !== 0)
    .map(value => value.trim())
    .filter(value => value !== '' && !value.startsWith('//'))
    .forEach(value => {
      if (value === '{') return;
      if (value === '}') {
        assert(parsingName);

        const extraFields = extraEventFields[parsingName!];
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (extraFields) {
          events[parsingName!].fields.push(
            ...Object.entries(extraFields).map(([name, type]) => ({ name, type })),
          );
        }

        parsingName = undefined;
        return;
      }

      let description = _.nth(value.match(/\/\/ (.+)$/), 1);
      description = description != null ? formatDescription(description) : undefined;

      if (parsingName == null) {
        [, parsingName] = value.match(/"(.+)"/)!;
        events[parsingName] = { description, local: false, fields: [] };
      } else {
        let [, name, type] = value.match(/^"(.+?)"\s*"(.+?)"/)!;

        if (name === 'local') {
          events[parsingName].local = type === '1';
          return;
        }

        if ((type === 'byte' || type === 'short') && /player_?id/i.test(name)) {
          type = 'PlayerID';
        }

        if (/ent(ity)?_?index/i.test(name)) {
          type = 'EntityIndex';
        }

        events[parsingName].fields.push({ name, description, type });
      }
    });

  return events;
}

export async function generateEvents() {
  const fileNames = [
    'game/core/pak01_dir/resource/core.gameevents',
    'game/dota/pak01_dir/resource/game.gameevents',
    'game/dota/pak01_dir/resource/port.gameevents',
  ];

  const files = await Promise.all(
    fileNames.map(async fileName => ({
      name: fileName.match(/resource\/(.+)\.gameevents$/)![1],
      content: parseFile(await getFile(fileName)),
    })),
  );

  const events = _.fromPairs(files.map(({ name, content }) => [name, content]));
  await Promise.all([outputJson('events', events), outputFile('events.d.ts', types)]);
}
