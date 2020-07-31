/* eslint-disable @typescript-eslint/ban-types */
import { exportNamespacedRoot } from '../../util';

export const types = exportNamespacedRoot(__filename, 'apiTypes', 'apiTypes.Declaration[]');

// EXPORT START
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
  types: string[];
}
// EXPORT END
