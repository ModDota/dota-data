import assert from 'assert';
import { formatDescription, getFile, outputFile, outputJson } from '../util';
import { Event, types } from './types';

function parseFile(events: Record<string, Event>, content: string, sourceFile: string) {
  let parsingName: string | undefined;

  content
    .split('\n')
    .filter((value) => value.match(/^(\t*)/)![0].length !== 0)
    .map((value) => value.trim())
    .filter((value) => value !== '' && !value.startsWith('//'))
    .forEach((value) => {
      if (value === '{') return;
      if (value === '}') {
        assert(parsingName);
        parsingName = undefined;
        return;
      }

      let description = value.match(/\/\/ (.+)$/)?.[1];
      description = description != null ? formatDescription(description) : undefined;

      if (parsingName == null) {
        [, parsingName] = value.match(/"(.+)"/)!;
        events[parsingName] ??= {
          name: parsingName,
          sourceFile,
          description,
          local: false,
          fields: [],
        };
        events[parsingName].sourceFile = sourceFile;
      } else {
        let [, name, type] = value.match(/^"(.+?)"\s*"(.+?)"/)!;

        const existingField = events[parsingName].fields.find((f) => f.name === name);
        if (existingField) {
          existingField.description ??= description;
          return;
        }

        if (name === 'local') {
          events[parsingName].local = type === '1';
          return;
        }

        if ((type === 'byte' || type === 'short') && /player_?id/i.test(name)) {
          type = 'PlayerID';
        }

        if (/ent(ity)?_?index/i.test(name) || name.includes('userid')) {
          type = 'EntityIndex';
        }

        events[parsingName].fields.push({ name, description, type });
      }
    });
}

export async function generateEvents() {
  const files = await Promise.all(
    [
      [
        'game/core/pak01_dir/resource/core.gameevents',
        'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/bce1224064fe01a0e4e33384084798492a03036f',
      ],
      [
        'resource/game.gameevents',
        'https://raw.githubusercontent.com/arcadia-redux/dota_vpk_updates/main',
      ],
    ].map(
      async ([fileName, fileSource]) => [fileName, await getFile(fileName, fileSource)] as const,
    ),
  );

  const events: Record<string, Event> = {};
  for (const [fileName, content] of files) {
    parseFile(events, content, fileName.match(/resource\/(.+)\.gameevents$/)![1]);
  }

  await Promise.all([
    outputJson('events', Object.values(events)),
    outputFile('events.d.ts', types),
  ]);
}
