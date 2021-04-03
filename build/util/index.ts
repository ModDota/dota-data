import fs from 'fs-extra';
import path from 'path';

export * from '../../src/utils/github';
export * from './export-types';
export * from './normalization';

const dump = fs.readFileSync(path.join(__dirname, '../../dumper/dump'), 'utf8');
export function readDump(name: string) {
  const [, ...groups] = dump.split(/\$> (.+)/g);
  let value = groups[groups.indexOf(name) + 1];
  // Cut off initializing scripting VM line
  value = value.substring(value.indexOf("["));
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (value == null) throw new Error(`Couldn't find dump "${name}"`);
  return value.trim();
}

const FILES = path.join(__dirname, '../../files');
export const outputFile = (name: string, data: string) =>
  fs.outputFileSync(path.join(FILES, name), `${data.trimEnd()}\n`);
export const outputJson = (name: string, data: any) =>
  fs.outputJsonSync(path.join(FILES, `${name}.json`), data, { spaces: 2 });
