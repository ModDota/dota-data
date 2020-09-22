import { exportNamespacedRoot } from '../../util';

export const types = exportNamespacedRoot(__filename, 'api', 'api.Declaration[]');

// EXPORT START
export type Declaration = FunctionDeclaration | ClassDeclaration;
export type Availability = 'server' | 'client' | 'both';

export type Type = string | LiteralType | TableType | ArrayType | FunctionType;

export interface LiteralType {
  kind: 'literal';
  value: number;
}

export interface TableType {
  kind: 'table';
  key: Type[];
  value: Type[];
}

export interface ArrayType {
  kind: 'array';
  types: Type[];
}

export interface FunctionType {
  kind: 'function';
  returns: Type[];
  args: FunctionParameter[];
}

export interface FunctionParameter {
  name: string;
  types: Type[];
  description?: string;
}

export interface FunctionDeclaration extends FunctionType {
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

export interface ClassMethod extends FunctionDeclaration {
  abstract?: true;
}

export type ClassMember = ClassMethod | Field;
export interface ClassDeclaration {
  kind: 'class';
  name: string;
  clientName?: string;
  description?: string;
  extend?: string;
  instance?: string;
  call?: FunctionType;
  members: ClassMember[];
}
// EXPORT END
