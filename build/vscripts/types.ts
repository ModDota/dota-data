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
