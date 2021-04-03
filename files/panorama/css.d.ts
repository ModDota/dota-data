declare namespace cssProperties {
  export interface Property {
    description: string;
    examples?: string[];
  }
}

declare const cssProperties: Record<string, cssProperties.Property>;
export = cssProperties;
