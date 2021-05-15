import * as fs from 'fs-extra';
import { CACHE_VERSION, tryReadJson } from '../utils/cache';
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
    .filter((x) => x.type === 'file')
    .map((file): IndexEntry => {
      const [, type, language] = file.name.match(/^(.+)_(.+)\.txt$/)!;
      return { language: language as DotaLanguage, type, sha: file.sha };
    });

// Cache responses for 120s, because unauthenticated requests are limited to 60 per hour
const CACHE_LIFETIME = 120000;
async function getCachedEntries(cachePath: string) {
  const content: IndexCache | undefined = await tryReadJson(cachePath);
  if (
    content &&
    content.version === CACHE_VERSION &&
    Date.now() - content.timestamp < CACHE_LIFETIME
  ) {
    return content.entries;
  }
}

export async function getIndexEntries(cachePath?: string) {
  if (cachePath == null) {
    return fetchIndexEntries();
  }

  const cachedEntries = await getCachedEntries(cachePath);
  if (cachedEntries) {
    return cachedEntries;
  }

  const entries = await fetchIndexEntries();
  const cache: IndexCache = { timestamp: Date.now(), version: CACHE_VERSION, entries };
  await fs.outputJson(cachePath, cache);
  return entries;
}
