import got from 'got';
import vdf from 'vdf-extra';

const RAW_FILE_PATH = 'https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master';
export const getFile = async (name: string) => (await got(`${RAW_FILE_PATH}/${name}`)).body;
export const getJsonFile = async (name: string) =>
  (await got(`${RAW_FILE_PATH}/${name}`, { json: true })).body;
export const getDotaFile = async (name: string) => getFile(`game/dota/${name}`);
export const getDotaVdfFile = async (name: string) =>
  vdf.parse<any>(await getDotaFile(name), { parseUnquotedStrings: true });
