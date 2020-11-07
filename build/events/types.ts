import { exportNamespacedRoot } from '../util';

// EXPORT START
export interface Event {
  name: string;
  sourceFile: string;
  description?: string;
  local: boolean;
  fields: EventField[];
}

export interface EventField {
  name: string;
  description?: string;
  type: string;
}
// EXPORT END

export const types = exportNamespacedRoot(__filename, 'events', 'events.Event[]');
