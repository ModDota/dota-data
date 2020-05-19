import { exportNamespacedRoot } from '../../util';

export const types = exportNamespacedRoot(__filename, 'enums', 'enums.Declaration[]');

// EXPORT START
export type Declaration = Constant | Enum;
export type Availability = 'server' | 'both';

export interface Constant {
  kind: 'constant';
  name: string;
  description?: string;
  value: number;
  available: Availability;
}

export interface Enum {
  kind: 'enum';
  name: string;
  description?: string;
  available: Availability;
  members: EnumMember[];
}

export interface EnumMember {
  name: string;
  description?: string;
  value: number;
}
// EXPORT END
