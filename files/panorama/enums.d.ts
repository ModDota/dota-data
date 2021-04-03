declare namespace enums {
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
}

declare const enums: enums.Enum[];
export = enums;
