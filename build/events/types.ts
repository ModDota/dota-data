import { exportNamespacedRoot } from '../util';

// EXPORT START
export interface Event {
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

export const types = exportNamespacedRoot(
  __filename,
  'events',
  'Record<string, Record<string, events.Event>>',
);
