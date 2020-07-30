/* eslint-disable @typescript-eslint/ban-types */
import { exportNamespacedRoot } from '../../util';

export const types = exportNamespacedRoot(__filename, 'types', 'types.Declaration[]');

// EXPORT START
export type Declaration = Object;

export interface Object {
  kind: 'object';
  name: string;
  description?: string;
  fields: ObjectField[];
}

export interface ObjectField {
  name: string;
  description?: string;
  types: string[];
}
// EXPORT END
