declare namespace events {
  export interface PanoramaEvent {
    description: string;
    panelEvent: boolean;
    args: PanoramaEventArgument[];
  }
  
  export interface PanoramaEventArgument {
    name?: string;
    type: string;
  }
}

declare const events: Record<string, events.PanoramaEvent>;
export = events;
