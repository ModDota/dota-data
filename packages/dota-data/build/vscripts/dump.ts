import { readDump } from '../util';

const reloadMessage = 'Initializing script VM...\n...done';
export const serverDump: Dump = JSON.parse(readDump('script_reload').replace(reloadMessage, ''));
export const clientDump: Dump = JSON.parse(readDump('cl_script_reload').replace(reloadMessage, ''));

export type Dump = (DumpConstant | DumpClass | DumpFunction)[];

export interface DumpConstant {
  kind: 'constant';
  name: string;
  value: number;
  enum?: string;
  description?: string;
}

export interface DumpClass {
  kind: 'class';
  name: string;
  members: DumpMethod[];
  extend?: string;
  instance?: string;
}

export interface DumpMethod {
  name: string;
  description?: string;
  args: { name?: string; type: string }[];
  returns: string;
}

export interface DumpFunction extends DumpMethod {
  kind: 'function';
}
