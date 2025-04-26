declare namespace enums {
  export type Declaration = Constant | Enum;
  export type Availability = 'client' | 'both';
  
  export interface Constant {
    kind: 'constant';
    name: string;
    description?: string;
    value: number;
    available: Availability;
  }
  
  export interface Enum {
    kind: 'enum';
    name: string;
    description?: string;
    available: Availability;
    members: EnumMember[];
  }
  
  export interface EnumMember {
    name: string;
    description?: string;
    value: number;
  }
}

declare const enums: enums.Declaration[];
export = enums;
