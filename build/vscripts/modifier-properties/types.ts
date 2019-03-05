import { exportNamespacedRoot } from '../../util';

export const types = exportNamespacedRoot(__filename, 'modifier', 'modifier.ModifierField[]');

// EXPORT START
export type Kind = 'property' | 'event';
export type ArgumentType = 'void' | 'unit' | 'ability' | 'attack';
export type ReturnsType = 'void' | 'number' | 'string' | 'binary' | ({} & string);

export interface ModifierField {
  kind: Kind;
  functionName: string;
  enumName: string;
  description?: string;
  argument: ArgumentType;
  returns: ReturnsType;
}
// EXPORT END
