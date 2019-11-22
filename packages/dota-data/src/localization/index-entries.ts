import * as fs from 'fs-extra';
import { tryReadJson } from '../utils/cache';
import { getDotaDirectoryContents } from '../utils/github';
import { DotaLanguage } from './languages';

export interface IndexEntry {
  language: DotaLanguage;
  type: string;
  sha: string;
}

interface IndexCache {
  timestamp: number;
  version: string;
  entries: IndexEntry[];
}

const fetchIndexEntries = async () =>
  (await getDotaDirectoryContents('pak01_dir/resource/localization'))
    .filter(x => x.type === 'file')
    .map(
      (file): IndexEntry => {
        const [, type, language] = file.name.match(/^(.+)_(.+)\.txt$/)!;
        return { language: language as DotaLanguage, type, sha: file.sha };
      },
    );

// eslint-disable-next-line @typescript-eslint/no-require-imports
const CACHE_VERSION = require('../../package.json').version;
// Cache responses for 120s, because unauthenticated requests are limited to 60 per hour
const CACHE_LIFETIME = 120000;

async function getCachedEntries(cachePath: string) {
  const content: IndexCache | undefined = await tryReadJson(cachePath);
  if (
    content &&
    Date.now() - content.timestamp < CACHE_LIFETIME &&
    content.version === CACHE_VERSION
  ) {
    return content.entries;
  }
}

export async function getIndexEntries(cachePath?: string) {
  if (cachePath != null) {
    const cachedEntries = await getCachedEntries(cachePath);
    if (cachedEntries) {
      return cachedEntries;
    }
  }

  const entries = await fetchIndexEntries();

  if (cachePath != null) {
    const cache: IndexCache = { timestamp: Date.now(), version: CACHE_VERSION, entries };
    await fs.outputJson(cachePath, cache);
  }

  return entries;
}
