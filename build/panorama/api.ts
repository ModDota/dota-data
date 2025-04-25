import _ from 'lodash';
import { readDump } from '../util';
import * as apiTypes from './api-types';

// Basic type mapping, might need refinement based on actual Panorama API types
const typeMappings: Record<string, string> = {
  handle: 'object', // Panorama uses JS objects, 'handle' might map to Panel, Entity, etc.
  ehandle: 'object', // Similar to handle
  string: 'string',
  int: 'number',
  uint: 'number',
  float: 'number',
  bool: 'boolean',
  table: 'object', // Lua table likely maps to JS object or array
  Vector: 'Vector', // Assuming a Vector type exists or will be defined
  QAngle: 'QAngle', // Assuming a QAngle type exists or will be defined
  Quaternion: 'Quaternion', // Assuming a Quaternion type exists or will be defined
  void: 'void',
  unknown: 'unknown',
  var: 'any', // Generic variable type
  // Add more specific mappings as needed
};

function transformType(rawType: string): string {
  return typeMappings[rawType] || rawType; // Default to raw type if no mapping found
}

import fs from 'fs';
import path from 'path';

function parseApiDump(dumpContent: string): apiTypes.Declaration[] {
  const declarations: apiTypes.Declaration[] = [];
  
  // 读取已存在的枚举文件，用于过滤重复的枚举
  let existingEnums: string[] = [];
  try {
    const enumsFilePath = path.resolve(__dirname, '../../files/panorama/enums.json');
    if (fs.existsSync(enumsFilePath)) {
      const enumsData = JSON.parse(fs.readFileSync(enumsFilePath, 'utf8'));
      existingEnums = enumsData.map((enumItem: any) => enumItem.name);
      console.log(`Loaded ${existingEnums.length} existing enums from enums.json`);
    }
  } catch (error) {
    console.error('Error loading existing enums:', error);
    existingEnums = [];
  }
  
  try {
    // Log the beginning of the dump content to understand its format
    console.log(`Panorama API dump content (first 500 chars):\n${dumpContent.substring(0, 500)}...`);
    
    // The dump appears to contain TypeScript declarations rather than JSON
    // We need to parse enum declarations and other TypeScript constructs
    
    // Parse enum declarations
    const enumRegex = /declare\s+enum\s+([\w_]+)\s*\{([\s\S]*?)\}/g;
    let enumMatch;
    
    while ((enumMatch = enumRegex.exec(dumpContent)) !== null) {
      const enumName = enumMatch[1];
      const enumBody = enumMatch[2];
      
      // 检查枚举是否已经存在于enums.json中，如果存在则跳过
      if (existingEnums.includes(enumName)) {
        console.log(`Skipping enum ${enumName} as it already exists in enums.json`);
        continue;
      }
      
      // Create a class declaration for each enum
      const enumDeclaration: apiTypes.ClassDeclaration = {
        kind: 'class',
        name: enumName,
        description: `Enum: ${enumName}`,
        members: [],
        available: 'client'
      };
      
      // Parse enum values
      const enumValueRegex = /\s*([\w_]+)\s*=\s*([\d-]+)/g;
      let valueMatch;
      
      while ((valueMatch = enumValueRegex.exec(enumBody)) !== null) {
        const valueName = valueMatch[1];
        const valueValue = parseInt(valueMatch[2], 10);
        
        // Add each enum value as a field
        enumDeclaration.members.push({
          kind: 'field',
          name: valueName,
          type: 'number',
          description: `Enum value: ${valueValue}`,
          available: 'client'
        });
      }
      
      declarations.push(enumDeclaration);
    }
    
    // Parse function declarations (if any)
    // This would need to be expanded based on the actual format of function declarations in the dump
    const functionRegex = /function\s+([\w_]+)\s*\(([^)]*)\)\s*:\s*([\w_<>|\[\]]+)/g;
    let functionMatch;
    
    while ((functionMatch = functionRegex.exec(dumpContent)) !== null) {
      const functionName = functionMatch[1];
      const argsString = functionMatch[2];
      const returnType = functionMatch[3];
      
      // Parse arguments
      const args: apiTypes.Parameter[] = argsString.split(',').map((argStr, index) => {
        const argParts = argStr.trim().split(':');
        return {
          name: argParts[0]?.trim() || `arg${index}`,
          type: argParts[1]?.trim() || 'any',
          description: ''
        };
      });
      
      declarations.push({
        kind: 'function',
        name: functionName,
        description: '',
        returns: returnType,
        args,
        available: 'client'
      });
    }
    
    console.log(`Successfully parsed ${declarations.length} declarations from TypeScript definitions.`);
  } catch (error) {
    console.error('Error parsing Panorama API dump:', error);
    // Return empty or partial declarations if parsing fails

  }
  
  // Parse class declarations (if any)
  const classRegex = /declare\s+class\s+([\w_]+)(?:\s+extends\s+([\w_]+))?\s*\{([\s\S]*?)\}/g;
  let classMatch;
  
  while ((classMatch = classRegex.exec(dumpContent)) !== null) {
    try {
      const className = classMatch[1];
      const extendName = classMatch[2] || undefined;
      const classBody = classMatch[3];
      
      // Create a class declaration
      const classDeclaration: apiTypes.ClassDeclaration = {
        kind: 'class',
        name: className,
        description: '',
        extend: extendName,
        members: [],
        available: 'client'
      };
      
      // Parse class methods
      const methodRegex = /\s*([\w_]+)\s*\(([^)]*)\)\s*:\s*([\w_<>|\[\]]+)\s*;/g;
      let methodMatch;
      
      while ((methodMatch = methodRegex.exec(classBody)) !== null) {
        const methodName = methodMatch[1];
        const argsString = methodMatch[2];
        const returnType = methodMatch[3];
        
        // Parse arguments
        const args: apiTypes.Parameter[] = argsString.split(',').filter(arg => arg.trim()).map((argStr, index) => {
          const argParts = argStr.trim().split(':');
          return {
            name: argParts[0]?.trim() || `arg${index}`,
            type: (argParts[1]?.trim() || 'any'),
            description: ''
          };
        });
        
        classDeclaration.members.push({
          kind: 'function',
          name: methodName,
          description: '',
          returns: returnType,
          args,
          available: 'client'
        });
      }
      
      // Parse class fields
      const fieldRegex = /\s*([\w_]+)\s*:\s*([\w_<>|\[\]]+)\s*;/g;
      let fieldMatch;
      
      while ((fieldMatch = fieldRegex.exec(classBody)) !== null) {
        const fieldName = fieldMatch[1];
        const fieldType = fieldMatch[2];
        
        classDeclaration.members.push({
          kind: 'field',
          name: fieldName,
          type: fieldType,
          description: '',
          available: 'client'
        });
      }
      
      declarations.push(classDeclaration);
    } catch (error) {
      console.error(`Error parsing class declaration:`, error);
    }
  }
  return declarations;
}

let generatedApi: apiTypes.Declaration[] | null = null;

export function generatePanoramaApi(): apiTypes.Declaration[] {
  if (generatedApi) return generatedApi;

  // 读取两种类型的 Panorama API 声明
  const scriptHelpContent = readDump('cl_panorama_script_help');
  const tsDeclarationsContent = readDump('cl_panorama_typescript_declarations');
  
  // 合并两种声明内容
  const combinedContent = scriptHelpContent + '\n' + tsDeclarationsContent;
  
  // 解析合并后的 API 声明
  generatedApi = parseApiDump(combinedContent);
  console.log(`Generated ${generatedApi.length} Panorama API declarations`);
  
  return generatedApi;
}

function generateApiTypesString(api: apiTypes.Declaration[]): string {
  let result = `/* eslint-disable @typescript-eslint/no-unused-vars */
// Auto-generated Panorama API definitions.

declare namespace Panorama {
    // Basic types (add more as needed)
    type Panel = object; // Generic Panel type
    type EntityIndex = number;
    type AbilityEntityIndex = number;
    type ItemEntityIndex = number;
    type PlayerID = number;
    type TeamID = number;
    type ScheduleID = number;
    type SoundEventID = number;
    type ParticleID = number;
    type SceneEntityIndex = number;
    type BuffID = number;
    type HeroID = number;
    type ViewerID = number;
    type SpawnGroupHandle = number;
    type ProjectileID = number;
    type EventListenerID = number;
    type GameEventSubscriptionID = number;
    type PlayerUltimateStateOrTime = number;
    type ParticleAttachment = number;
    type DOTAUnitOrder = number;
    type FindOrder = number;
    type OverheadAlert = number;
    type PlayerOrderIssuer = number;
    type OrderQueueBehavior = number;
    type ClickBehaviors = number;
    type AbilityLearnResult = number;
    type DOTAShopType = number;
    type DOTATeam = number;
    type GameActivity = number;
    type GameState = number;
    type GameMode = number;
    type GameDifficulty = number;
    type HeroSelectionState = number;
    type HullRadius = number;
    type DOTAHUDVisibility = number;
    type DOTAScenePanelEvent = number;
    type DOTATeamDetails = object;
    type DOTAPlayerDetails = object;
    type DOTAHeroDetails = object;
    type DOTACustomUIPanel = object;
    type DOTACustomUIClient = object;
    type DOTACustomUIConfig = object;
    type Vector = [number, number, number] | { x: number; y: number; z: number };
    type QAngle = [number, number, number] | { x: number; y: number; z: number };
    type Quaternion = [number, number, number, number] | { x: number; y: number; z: number; w: number };

    // Global API Functions
`;

  for (const decl of api) {
    if (decl.kind === 'function') {
      const argsString = decl.args.map(arg => `${arg.name}: ${arg.type}`).join(', ');
      if (decl.description) {
        result += `    /**
     * ${decl.description.replace(/\n/g, '\n     * ')}
     */
`;
      }
      result += `    function ${decl.name}(${argsString}): ${decl.returns};
`;
    } else if (decl.kind === 'class') {
      if (decl.description) {
        result += `    /**\n     * ${decl.description.replace(/\n/g, '\n     * ')}\n     */\n`;
      }
      result += `    class ${decl.name}${decl.extend ? ` extends ${decl.extend}` : ''} {\n`;
      for (const member of decl.members) {
        if (member.kind === 'function') {
          const argsString = member.args.map(arg => `${arg.name}: ${arg.type}`).join(', ');
          if (member.description) {
            result += `        /**\n         * ${member.description.replace(/\n/g, '\n         * ')}\n         */\n`;
          }
          result += `        ${member.name}(${argsString}): ${member.returns};\n`;
        } else if (member.kind === 'field') {
          if (member.description) {
            result += `        /**\n         * ${member.description.replace(/\n/g, '\n         * ')}\n         */\n`;
          }
          result += `        ${member.name}: ${member.type};\n`;
        }
      }
      result += `    }\n`;
    }
  }

  result += `    // Global selector function
    function $(selector: string): Panel | null;
}

// Global helper functions (if applicable)
declare function $(selector: string): Panorama.Panel | null;
declare function $F(value: number): number; // Format float

// Add other global functions/variables if known
`;

  return result;
}

let generatedApiTypesString: string | undefined;

export function getPanoramaApiTypes(): string {
    if (generatedApiTypesString) return generatedApiTypesString;
    const api = generatePanoramaApi();
    generatedApiTypesString = generateApiTypesString(api);
    return generatedApiTypesString;
}