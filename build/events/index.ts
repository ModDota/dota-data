import assert from 'assert';
import { formatDescription, outputFile, outputJson } from '../util';
import { Event, types } from './types';
import vpk from 'vpk';
import * as path from 'path';

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

export async function generateEvents(dota2Dir: string) {
  console.log('- Opening core vpk...');
  const coreVpk = new vpk(path.join(dota2Dir, 'game', 'core', 'pak01_dir.vpk'));
  coreVpk.load();

  console.log('- Opening game vpk...');
  const gameVpk = new vpk(path.join(dota2Dir, 'game', 'dota', 'pak01_dir.vpk'));
  gameVpk.load();

  const coreEvents = coreVpk.getFile('resource/core.gameevents');
  const gameEvents = gameVpk.getFile('resource/game.gameevents');

  const events: Record<string, Event> = {};
  parseFile(events, coreEvents.toString(), 'core');
  parseFile(events, gameEvents.toString(), 'game');

  await Promise.all([
    outputJson('events', Object.values(events)),
    outputFile('events.d.ts', types),
  ]);
}
