import { exportNamespacedRoot } from '../util';

// EXPORT START
export interface Property {
  description: string;
  examples?: string[];
}
// EXPORT END

export const types = exportNamespacedRoot(
  __filename,
  'cssProperties',
  'Record<string, cssProperties.Property>',
);
