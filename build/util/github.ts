import got from 'got';
import vdf from 'vdf-extra';

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

const RAW_FILE_PATH = 'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master';
export const getFile = async (name: string) => (await got(`${RAW_FILE_PATH}/${name}`)).body;
export const getJsonFile = async (name: string) =>
  (await got(`${RAW_FILE_PATH}/${name}`, { json: true })).body;
export const getDotaFile = async (name: string) => getFile(`game/dota/${name}`);
export const getDotaVdfFile = async (name: string) =>
  vdf.parse<any>(await getDotaFile(name), { parseUnquotedStrings: true });
