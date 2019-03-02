import { readDump } from '../util';
import { Dump } from './types';

const reloadingMessage = 'Initializing script VM...\n...done';
export const readVScriptsDump = async (): Promise<{ server: Dump; client: Dump }> => ({
  server: JSON.parse((await readDump('script_reload')).replace(reloadingMessage, '')),
  client: JSON.parse((await readDump('cl_script_reload')).replace(reloadingMessage, '')),
});
