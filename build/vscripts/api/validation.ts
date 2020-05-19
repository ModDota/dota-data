import { serverDump } from '../dump';
import { enumDeclarations } from '../enums';
import { extraDeclarations } from './data';
import { ArrayType, FunctionType, Type } from './types';

const isPrimitiveType = (type: Type) => primitiveTypes.includes(type as any);
const primitiveTypes = [
  'bool',
  'ehandle',
  'float',
  'handle',
  'int',
  'nil',
  'string',
  'table',
  'uint',
  'unknown',
  'Vector2D',
];

const isUniqueType = (type: Type) => uniqueTypes.includes(type as any);
const uniqueTypes = [
  'CombatAnalyzerQueryID',
  'CustomGameEventListenerID',
  'EntityIndex',
  'EventListenerID',
  'ParticleID',
  'PlayerID',
  'ProjectileID',
];

const isEnumReference = (type: Type) => enumNames.includes(type as any);
const enumNames = enumDeclarations.filter(x => x.kind === 'enum').map(x => x.name);

const isClassOrInterfaceReference = (type: Type) => classOrDeclarationNames.includes(type as any);
const classOrDeclarationNames = [...serverDump, ...extraDeclarations]
  .filter(x => x.kind === 'class' || x.kind === 'interface')
  .map(x => x.name);

const isNumberLiteral = (type: Type) => !Number.isNaN(Number(type));

const isPseudoRecordType = (type: Type) => typeof type === 'string' && type.includes('Record<');

const isArrayType = (type: Type): type is ArrayType => typeof type === 'object' && 'array' in type;

const isFunctionType = (type: Type): type is FunctionType =>
  typeof type === 'object' && 'returns' in type;

const isValidArrayType = (type: Type) => isArrayType(type) && isValidType(type.array);

const isValidFunctionType = (type: Type) =>
  isFunctionType(type) &&
  type.returns.every(isValidType) &&
  type.args.every(arg => arg.types.every(isValidType));

export const isValidType = (type: Type): boolean =>
  isPrimitiveType(type) ||
  isUniqueType(type) ||
  isPseudoRecordType(type) ||
  isValidArrayType(type) ||
  isValidFunctionType(type) ||
  isEnumReference(type) ||
  isNumberLiteral(type) ||
  isClassOrInterfaceReference(type);

export function isCompatibleOverride(original: string, override: Type) {
  if (override === 'nil') return true;
  if (override === original) return true;

  switch (original) {
    case 'int':
    case 'uint':
    case 'float':
      return isUniqueType(override) || isNumberLiteral(override) || isEnumReference(override);

    case 'handle':
      return (
        override === 'table' ||
        isPseudoRecordType(override) ||
        isArrayType(override) ||
        isFunctionType(override) ||
        isClassOrInterfaceReference(override)
      );

    case 'unknown':
    case 'table':
      return true;

    case 'nil':
    case 'bool':
      return false;

    default:
      throw new Error(`Unknown source type ${original}`);
  }
}
