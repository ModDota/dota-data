import _ from 'lodash';
import { ArrayType, FunctionType, Parameter, Type } from '../types';

export const func = (args: [string, _.Many<string>][], returns: _.Many<string>): FunctionType => ({
  returns: _.castArray(returns),
  args: args.map(([name, type]): Parameter => ({ name, types: _.castArray(type) })),
});
export const array = (of: Type): ArrayType => ({ array: of });

export interface ExtensionClass {
  description?: string;
}

export interface ExtensionFunction {
  deprecated?: string;
  description?: string;
  returns?: _.Many<Type>;
  args?: Record<number, [string | null, (_.Many<Type> | null)?, string?]>;
}
