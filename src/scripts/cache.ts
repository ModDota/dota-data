import fs from 'fs-extra';
import got from 'got';
import { CACHE_VERSION, tryReadJson } from '../utils/cache';

const HASH_URL =
  'https://api.github.com/repos/SteamDatabase/GameTracking-Dota2/git/refs/heads/master';

// Cache responses for 120s, because unauthenticated requests are limited to 60 per hour
const ASSUME_UNCHANGED_FOR = 120000;

interface Cache {
  timestamp: number;
  version: string;
  hash: string;
}

export async function isUnchangedHash(cachePath: string) {
  const oldCache: Cache | undefined = await tryReadJson(cachePath);
  if (
    oldCache &&
    oldCache.version === CACHE_VERSION &&
    Date.now() - oldCache.timestamp < ASSUME_UNCHANGED_FOR
  ) {
    return true;
  }

  const hash = (await got(HASH_URL).json<any>()).object.sha;
  const newCache: Cache = { timestamp: Date.now(), version: CACHE_VERSION, hash };
  await fs.outputJson(cachePath, newCache);

  return oldCache?.hash === hash;
}
