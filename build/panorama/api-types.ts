export interface Parameter {
  name: string;
  type: string;
  description?: string;
}

export interface FunctionDeclaration {
  kind: 'function';
  name: string;
  description?: string;
  returns: string;
  args: Parameter[];
  available?: 'both' | 'server' | 'client'; // Assuming Panorama API might also have context differences
  deprecated?: string | boolean;
}

export interface ClassDeclaration {
  kind: 'class';
  name: string;
  description?: string;
  extend?: string; // Add extend property for class inheritance
  members: (FunctionDeclaration | FieldDeclaration)[]; // Assuming classes might have fields too
  available?: 'both' | 'server' | 'client';
}

export interface FieldDeclaration {
  kind: 'field';
  name: string;
  type: string;
  description?: string;
  available?: 'both' | 'server' | 'client';
}

export type Declaration = FunctionDeclaration | ClassDeclaration;