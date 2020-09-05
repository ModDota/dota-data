import { ArraySchema } from './extra/array';
import { BoolSchema } from './extra/bool';
import { RootSchema } from './root';
import { Schema } from './schema';
import { AnySchema } from './types/any';
import { ArrayLikeSchema } from './types/array-like';
import { EnumsSchema } from './types/enums';
import { LiteralSchema, LiteralSchemaValue } from './types/literal';
import { NumberSchema } from './types/number';
import { ObjectSchema } from './types/object';
import { OneOfSchema } from './types/one-of';
import { StringSchema } from './types/string';

export * from './schema';
export {
  AnySchema,
  ArrayLikeSchema,
  EnumsSchema,
  LiteralSchema,
  NumberSchema,
  ObjectSchema,
  OneOfSchema,
  RootSchema,
  StringSchema,
};

const wrapConstructor = <T extends new (...args: any[]) => any>(constructor: T) => (
  ...args: ConstructorParameters<T>
): InstanceType<T> => new constructor(...args);

// eslint-disable-next-line unicorn/prevent-abbreviations
export const obj = wrapConstructor(ObjectSchema);
export const root = wrapConstructor(RootSchema);
// eslint-disable-next-line unicorn/prevent-abbreviations
export const str = wrapConstructor(StringSchema);
// eslint-disable-next-line unicorn/prevent-abbreviations
export const num = wrapConstructor(NumberSchema);
export const oneOf = wrapConstructor(OneOfSchema);
export const literal = wrapConstructor(LiteralSchema);
export const anything = wrapConstructor(AnySchema);
export const arrayLike = wrapConstructor(ArrayLikeSchema);
export const enums = wrapConstructor(EnumsSchema);
// export const alias = wrapConstructor(AliasSchema);

export const array = wrapConstructor(ArraySchema);
export const bool = wrapConstructor(BoolSchema);

export const int = () => num().integer();
export const map = (schema: Schema, name?: string) => obj(name).rest(schema);
export const oneOfLiterals = (values: LiteralSchemaValue[]) => oneOf(values.map(literal));
export const binaryBoolean = () => oneOfLiterals([0, 1]);
export const vector = () => arrayLike().min(3).max(3);
