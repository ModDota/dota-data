import { exportNamespacedRoot } from '../../util';

export const types = exportNamespacedRoot(__filename, 'api', 'api.TopLevelElement[]');

// EXPORT START
export type TopLevelElement = FunctionDeclaration | Class | Interface;
export type Availability = 'server' | 'client' | 'both';

export type Member = FunctionDeclaration | Field;
export interface Interface {
  kind: 'interface';
  name: string;
  description?: string;
  members: Member[];
}

export interface Class {
  kind: 'class';
  name: string;
  clientName?: string;
  description?: string;
  extend?: string;
  instance?: string;
  call?: FunctionType;
  members: Member[];
}

export type Type = string | FunctionType | ArrayType;
export interface ArrayType {
  array: Type;
}
export interface FunctionType {
  returns: Type[];
  args: Parameter[];
}

export interface Parameter {
  name: string;
  types: Type[];
  description?: string;
}

export interface FunctionDeclaration extends FunctionType {
  kind: 'function';
  name: string;
  available: Availability;
  description?: string;
  deprecated?: string;
}

export interface Field {
  kind: 'field';
  name: string;
  description?: string;
  types: string[];
}
// EXPORT END
