import { Type } from './api';

declare namespace apiTypes {
  export type Declaration = Primitive | Nominal | Object;
  
  export interface Primitive {
    kind: 'primitive';
    name: string;
    description?: string;
  }
  
  export interface Nominal {
    kind: 'nominal';
    name: string;
    description?: string;
    baseType: string;
  }
  
  export interface Object {
    kind: 'object';
    name: string;
    description?: string;
    extend?: string[];
    fields: ObjectField[];
  }
  
  export interface ObjectField {
    name: string;
    description?: string;
    types: Type[];
  }
}

declare const apiTypes: apiTypes.Declaration[];
export = apiTypes;
