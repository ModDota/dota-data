import { apiTypesDeclarations } from './api-types';
import { extraDeclarations } from './api/data';
import { ArrayType, FunctionType, LiteralType, TableType, Type } from './api/types';
import { serverDump } from './dump';
import { enumDeclarations } from './enums';

const isPrimitiveType = (type: Type) =>
  apiTypesDeclarations.some((t) => t.kind === 'primitive' && t.name === (type as any));

const isNominalType = (type: Type): boolean =>
  apiTypesDeclarations.some((t) => t.kind === 'nominal' && t.name === type);

const isEnumReference = (type: Type) => enumNames.has(type as any);
const enumNames = new Set(enumDeclarations.filter((x) => x.kind === 'enum').map((x) => x.name));

const isClassReference = (type: Type) => classNames.has(type as any);
const classNames = new Set(
  [...serverDump, ...extraDeclarations].filter((x) => x.kind === 'class').map((x) => x.name),
);

const isObjectReference = (type: Type) =>
  apiTypesDeclarations.some((t) => t.kind === 'object' && t.name === (type as any));

const isLiteralType = (type: Type): type is LiteralType =>
  typeof type === 'object' && type.kind === 'literal';

const isTableType = (type: Type): type is TableType =>
  typeof type === 'object' && type.kind === 'table';

const isArrayType = (type: Type): type is ArrayType =>
  typeof type === 'object' && type.kind === 'array';

const isFunctionType = (type: Type): type is FunctionType =>
  typeof type === 'object' && type.kind === 'function';

export function isCompatibleOverride(original: string, override: Type) {
  if (override === 'nil') return true;
  if (override === original) return true;

  switch (original) {
    case 'int':
    case 'uint':
    case 'float':
    case 'Uint64':
      return (
        isNominalType(override) ||
        (isLiteralType(override) && typeof override.value === 'number') ||
        isEnumReference(override)
      );

    case 'handle':
      return (
        override === 'table' ||
        isTableType(override) ||
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

const isValidTableType = (type: Type) =>
  isTableType(type) && type.key.every(isValidType) && type.value.every(isValidType);

const isValidArrayType = (type: Type) => isArrayType(type) && type.types.every(isValidType);

const isValidFunctionType = (type: Type) =>
  isFunctionType(type) &&
  type.returns.every(isValidType) &&
  type.args.every((arg) => arg.types.every(isValidType));

const isValidType = (type: Type): boolean =>
  isPrimitiveType(type) ||
  isNominalType(type) ||
  isLiteralType(type) ||
  isValidTableType(type) ||
  isValidArrayType(type) ||
  isValidFunctionType(type) ||
  isEnumReference(type) ||
  isClassReference(type) ||
  isObjectReference(type);

export function checkTypes(identifier: string, types: Type[]) {
  if (!types.every(isValidType)) {
    console.log(`Invalid type: ${identifier} = ${types.join(' | ')}`);
  }
}
