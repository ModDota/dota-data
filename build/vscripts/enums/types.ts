import { exportNamespacedRoot } from '../../util';

export const types = exportNamespacedRoot(__filename, 'enums', 'enums.TopLevelElement[]');

// EXPORT START
export type TopLevelElement = Constant | Enum;
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
  originalName?: string;
  description?: string;
  available: Availability;
  members: EnumMember[];
}

export interface EnumMember {
  name: string;
  originalName: string;
  description?: string;
  value: number;
}
// EXPORT END
