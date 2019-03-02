import fs from 'fs-extra';
import got from 'got';
import path from 'path';
import vdf from 'vdf-extra';

export const FILES = path.join(__dirname, '../files');
export const remove = (name: string) => fs.remove(path.join(FILES, name));
export const outputFile = (name: string, data: string) =>
  fs.outputFile(path.join(FILES, name), data.trimRight() + '\n');
export const outputJson = (name: string, data: any) =>
  fs.outputJson(path.join(FILES, name + '.json'), data, { spaces: 2 });

const CONTENTS_PATH = 'https://api.github.com/repos/SteamDatabase/GameTracking-Dota2/contents';
export const getDotaDirectoryContents = async (name: string): Promise<GitHubContentsResponse[]> =>
  (await got(`${CONTENTS_PATH}/game/dota/${name}`, { json: true })).body;
export interface GitHubContentsResponse {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

const fileRoot = 'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master';
export const getDotaVdfFile = async (name: string) =>
  vdf.parse<any>((await got(`${fileRoot}/game/dota/${name}`)).body, { parseUnquotedStrings: true });
