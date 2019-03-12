import { exportNamespacedRoot } from '../util';

// EXPORT START
export interface PanoramaEvent {
  description: string;
  panelEvent: boolean;
  args: PanoramaEventArgument[];
}

export interface PanoramaEventArgument {
  name?: string;
  type: string;
}
// EXPORT END

export const types = exportNamespacedRoot(
  __filename,
  'events',
  'Record<string, events.PanoramaEvent>',
);
