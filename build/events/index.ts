import _ from 'lodash';
import { formatDescription, getDotaFile, outputFile, outputJson } from '../util';
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
        parsingName = undefined;
        return;
      }

      let description = _.nth(value.match(/\/\/ (.+)$/), 1);
      description = description != null ? formatDescription(description) : undefined;

      if (parsingName == null) {
        parsingName = value.match(/"(.+)"/)![1];
        events[parsingName] = { description, local: false, fields: [] };
      } else {
        let [, name, type] = value.match(/^"(.+?)"\s*"(.+?)"/)!;

        if (name === 'local') {
          events[parsingName].local = type === '1';
        } else if (['unreliable', 'suppress', 'time', 'eventid'].includes(name)) {
          console.warn(`Event "${parsingName}" uses a reversed key name "${name}"`);
        } else {
          if ((type === 'byte' || type === 'short') && /player_?id/i.test(name)) type = 'PlayerID';
          events[parsingName].fields.push({ name, description, type });
        }
      }
    });

  return events;
}

export async function generateEvents() {
  const names = [
    'gameevents.res',
    'hltvevents.res',
    'modevents.res',
    'port_gameevents.res',
    'serverevents.res',
  ];

  const files = await Promise.all(
    names.map(async name => ({
      name: name.replace(/events\.res$/, ''),
      content: parseFile(await getDotaFile(`pak01_dir/resource/${name}`)),
    })),
  );

  const events = _.fromPairs(files.map(({ name, content }) => [name, content]));
  await Promise.all([outputJson('events', events), outputFile('events.d.ts', types)]);
}
