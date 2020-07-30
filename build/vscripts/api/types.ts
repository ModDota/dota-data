import { exportNamespacedRoot } from '../../util';

export const types = exportNamespacedRoot(__filename, 'api', 'api.Declaration[]');

// EXPORT START
export type Declaration = FunctionDeclaration | ClassDeclaration;
export type Availability = 'server' | 'client' | 'both';

export type Type = string | FunctionType | ArrayType;

export interface ArrayType {
  array: Type;
}

export interface FunctionType {
  returns: Type[];
  args: FunctionParameter[];
}

export interface FunctionParameter {
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
