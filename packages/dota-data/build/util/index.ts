import fs from 'fs-extra';
import path from 'path';

export * from '../../src/utils/github';
export * from './export-types';
export * from './normalization';

const dumpPath = path.join(__dirname, '../../../dumper/dump');
const fullDump = fs.readFile(dumpPath, 'utf8');
export const readDump = async (name: string) => {
  const [, ...groups] = (await fullDump).split(/\$> (.+)/g);
  const value = groups[groups.indexOf(name) + 1];
  if (value == null) throw new Error(`Couldn't find dump "${name}"`);
  return value;
};

const FILES = path.join(__dirname, '../../files');
export const outputFile = (name: string, data: string) =>
  fs.outputFile(path.join(FILES, name), `${data.trimRight()}\n`);
export const outputJson = (name: string, data: any) =>
  fs.outputJson(path.join(FILES, `${name}.json`), data, { spaces: 2 });
