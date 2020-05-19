import fs from 'fs-extra';
import _ from 'lodash';
import path from 'path';
import vdf from 'vdf-extra';
import { getDotaVdfFile } from '../utils/github';
import { isUnchangedHash } from './cache';

type GetFunction<T> = (options?: GetFunctionOptions) => Promise<T>;
export interface GetFunctionOptions {
  cache?: {
    path: string;
    preferCached?: boolean;
  };
}

const createGetFunction = (
  scriptPath: string,
  transform?: (content: any) => any,
): GetFunction<any> => async ({ cache }: GetFunctionOptions = {}) => {
  const fetchFile = async () => {
    const content = await getDotaVdfFile(scriptPath);
    delete content.Version;
    return transform ? transform(content) : content;
  };

  if (cache == null) {
    return fetchFile();
  }

  const cacheName = path.basename(scriptPath, path.extname(scriptPath));
  const cachePath = `${cache.path}/${cacheName}.json`;

  if (cache.preferCached || (await isUnchangedHash(`${cache.path}/manifest.json`))) {
    try {
      return await fs.readJson(cachePath);
    } catch {}
  }

  const content = await fetchFile();
  await fs.outputJson(cachePath, content);
  return content;
};

// @ts-ignore
export type Units = import('./units.generated').Root;
export const getUnits: GetFunction<Units> = createGetFunction('scripts/npc/npc_units.txt');

// @ts-ignore
export type Heroes = import('./heroes.generated').Root;
export const getHeroes: GetFunction<Heroes> = createGetFunction('scripts/npc/npc_heroes.txt');

// @ts-ignore
export type Portraits = import('./portraits.generated').Root;
export const getPortraits: GetFunction<Portraits> = createGetFunction(
  'pak01_dir/scripts/npc/portraits.txt',
);

// @ts-ignore
export type Emoticons = import('./emoticons.generated').Root;
export const getEmoticons: GetFunction<Emoticons> = createGetFunction(
  'pak01_dir/scripts/emoticons.txt',
  content =>
    Object.entries<any>(content).map(([id, v]) => ({
      id: Number(id),
      image: v.image_name,
      frameDuration: v.ms_per_frame,
      team: v.teamId,
      quality: v.quality,
      aliases: Object.values(v.aliases),
    })),
);

// @ts-ignore
export type Shops = import('./shops.generated').Root;
export const getShops: GetFunction<Shops> = createGetFunction(
  'pak01_dir/scripts/shops.txt',
  content => _.mapValues(content, group => vdf.entries(group).map(([, value]) => value)),
);

// TODO: Remove
const sortNumericKeys = (object: Record<string, any>) =>
  _.fromPairs(
    Object.entries(object)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([key, value]) => [Number(key), value]),
  );

function transformAbilities(content: any) {
  _.each(content, a => {
    if (a.AbilitySpecial) a.AbilitySpecial = sortNumericKeys(a.AbilitySpecial);
    if (a.ItemRequirements) a.ItemRequirements = sortNumericKeys(a.ItemRequirements);
  });

  return content;
}

// @ts-ignore
export type Items = import('./items.generated').Root;
export const getItems: GetFunction<Items> = createGetFunction(
  'pak01_dir/scripts/npc/items.txt',
  transformAbilities,
);

// @ts-ignore
export type Abilities = import('./abilities.generated').Root;
export const getAbilities: GetFunction<Abilities> = createGetFunction(
  'scripts/npc/npc_abilities.txt',
  transformAbilities,
);
