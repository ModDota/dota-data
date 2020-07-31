import { apiTypesDeclarations } from '../api-types';
import { serverDump } from '../dump';
import { enumDeclarations } from '../enums';
import { extraDeclarations } from './data';
import { ArrayType, FunctionType, Type } from './types';

const isPrimitiveType = (type: Type) =>
  apiTypesDeclarations.some(t => t.kind === 'primitive' && t.name === (type as any));

const isNominalPrimitiveType = (type: Type): boolean =>
  apiTypesDeclarations.some(
    t =>
      t.kind === 'nominal' &&
      t.name === (type as any) &&
      (isPrimitiveType(t.baseType) || isNominalPrimitiveType(t.baseType)),
  );

const isEnumReference = (type: Type) => enumNames.includes(type as any);
const enumNames = enumDeclarations.filter(x => x.kind === 'enum').map(x => x.name);

const isClassReference = (type: Type) => classNames.includes(type as any);
const classNames = [...serverDump, ...extraDeclarations]
  .filter(x => x.kind === 'class')
  .map(x => x.name);

const isObjectReference = (type: Type) =>
  apiTypesDeclarations.some(t => t.kind === 'object' && t.name === (type as any));

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
  isNominalPrimitiveType(type) ||
  isPseudoRecordType(type) ||
  isValidArrayType(type) ||
  isValidFunctionType(type) ||
  isNumberLiteral(type) ||
  isEnumReference(type) ||
  isClassReference(type) ||
  isObjectReference(type);

export function isCompatibleOverride(original: string, override: Type) {
  if (override === 'nil') return true;
  if (override === original) return true;

  switch (original) {
    case 'int':
    case 'uint':
    case 'float':
      return (
        isNominalPrimitiveType(override) || isNumberLiteral(override) || isEnumReference(override)
      );

    case 'handle':
      return (
        override === 'table' ||
        isPseudoRecordType(override) ||
        isArrayType(override) ||
        isFunctionType(override) ||
        isClassReference(override) ||
        isObjectReference(override)
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
