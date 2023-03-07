declare namespace engineEnums {
  export interface EngineEnum {
    name: string;
    members: EngineEnumMember[];
  }
  
  export interface EngineEnumMember {
    name: string;
    shortName: string;
  }
}

declare const engineEnums: engineEnums.EngineEnum[];
export = engineEnums;
