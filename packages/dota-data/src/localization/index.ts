import * as fs from 'fs-extra';
import _ from 'lodash';
import vdf from 'vdf-extra';
import { tryReadJson } from '../utils/cache';
import { getDotaVdfFile } from '../utils/github';
import { getIndexEntries } from './index-entries';
import { DotaLanguage } from './languages';

export * from './languages';

async function fetchLocalization(language: DotaLanguage, types: string[]) {
  const files = await Promise.all(
    types.map(async t => getDotaVdfFile(`pak01_dir/resource/localization/${t}_${language}.txt`)),
  );

  return _.omitBy(
    Object.assign({}, ...files.map(x => x.Tokens)),
    // EXTRA_VALUES appears because there are some repeated tokens in valve files
    (_value, key: string | typeof vdf.EXTRA_VALUES) =>
      typeof key !== 'string' || key.startsWith('[english]'),
  );
}

export interface GetLocalizationOptions {
  cache?: {
    path: string;
    preferCached?: boolean;
  };
}

export async function getLocalization(
  language: DotaLanguage,
  { cache }: GetLocalizationOptions = {},
) {
  if (!cache) {
    return fetchLocalization(
      language,
      (await getIndexEntries()).filter(x => x.language === language).map(x => x.type),
    );
  }

  const resultsCachePath = `${cache.path}/${language}.json`;

  if (cache.preferCached) {
    try {
      return await fs.readJson(resultsCachePath);
    } catch {}
  }

  const indexEntries = await getIndexEntries(`${cache.path}/index.json`);
  const updatedHashes = _.fromPairs(
    indexEntries.filter(e => e.language === language).map(e => [e.type, e.sha]),
  );

  const hashCachePath = `${cache.path}/${language}.hash.json`;
  if (_.isEqual(await tryReadJson(hashCachePath), updatedHashes)) {
    try {
      return await fs.readJson(resultsCachePath);
    } catch {}
  } else {
    await fs.outputJson(hashCachePath, updatedHashes);
  }

  const updatedResults = await fetchLocalization(language, Object.keys(updatedHashes));
  await fs.outputJson(resultsCachePath, updatedResults);
  return updatedResults;
}
