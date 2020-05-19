import * as fs from 'fs-extra';

export async function tryReadJson(filePath: string) {
  try {
    return await fs.readJson(filePath);
  } catch {}
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
export const CACHE_VERSION = require('../../package.json').version;
