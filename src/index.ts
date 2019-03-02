import fs from 'fs-extra';
import got from 'got';
import _ from 'lodash';
import path from 'path';
import { cleanup, generators } from './generators';
import { FILES, outputJson, remove } from './utils';

export { schemas } from './schemas';

export interface Metadata {
  commit: string;
  version: string;
}

const METADATA_PATH = path.join(FILES, 'metadata.json');
export async function getOldMetadata(): Promise<Metadata> {
  return (await fs.pathExists(METADATA_PATH))
    ? fs.readJson(METADATA_PATH)
    : { commit: '', version: '' };
}

const HEADS = 'https://api.github.com/repos/SteamDatabase/GameTracking-Dota2/git/refs/heads/master';
const PACKAGE_VERSION: string = fs.readJsonSync(path.join(__dirname, '../package.json')).version;
export async function getNewMetadata(): Promise<Metadata> {
  const commit: string = (await got(HEADS, { json: true })).body.object.sha;
  return { commit, version: PACKAGE_VERSION };
}

export async function update({ languages }: { languages?: string[] } = {}, force = false) {
  const newMetadata = await getNewMetadata();
  if (!force) {
    const oldMetadata = await getOldMetadata();
    if (_.isEqual(oldMetadata, newMetadata)) return false;
  }

  await Promise.all([cleanup(), remove('metadata.json')]);
  await Promise.all([
    outputJson('metadata', newMetadata),
    generators.scripts(),
    generators.localization({ languages }),
  ]);

  return true;
}
