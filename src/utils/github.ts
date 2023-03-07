import got from 'got';
import vdf from 'vdf-extra';

// const RAW_FILE_PATH = 'https://raw.githubusercontent.com/dotabuff/d2vpkr/master';
const RAW_FILE_PATH = 'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master';

export async function getFile(name: string) {
  const fileUrl = `${RAW_FILE_PATH}/${name}`;
  try {
    const result = await got(fileUrl);
    return result.body;
  } catch (error: unknown) {
    throw new Error(`Could not retrieve file ${name} from ${fileUrl}: ${error}`);
  }
}

export const getDotaFile = async (name: string) => getFile(`game/dota/${name}`);
export const getDotaVdfFile = async (name: string) =>
  vdf.parse<any>(await getDotaFile(name), { parseUnquotedStrings: true });

const CONTENTS_PATH =
  'https://api.github.com/repos/SteamDatabase/GameTracking-Dota2/contents/game/dota';
export const getDotaDirectoryContents = (name: string, basepath = CONTENTS_PATH) =>
  got(`${basepath}/${name}`).json<GitHubContentsResponse[]>();

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
