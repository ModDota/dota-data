declare namespace events {
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
}

declare const events: events.Event[];
export = events;
