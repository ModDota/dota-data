import { exportNamespacedRoot } from '../../util';

export const types = exportNamespacedRoot(__filename, 'enums', 'enums.Enum[]');

// EXPORT START
export interface Enum {
  name: string;
  // description?: string;
  members: EnumMember[];
}

export interface EnumMember {
  name: string;
  description?: string;
  value: number;
}
// EXPORT END
