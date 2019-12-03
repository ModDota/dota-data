import _ from 'lodash';
import { ArrayType, FunctionType, Member, Parameter, Type } from '../types';

export const array = (of: Type): ArrayType => ({ array: of });

export const func = (args: [string, _.Many<Type>][], returns: _.Many<Type>): FunctionType => ({
  returns: _.castArray(returns),
  args: args.map(([name, type]): Parameter => ({ name, types: _.castArray(type) })),
});

export interface ExtensionClass {
  description?: string;
  members?: Member[];
}

export interface ExtensionFunction {
  deprecated?: string;
  description?: string | ((original?: string) => string);
  returns?: _.Many<Type>;
  args?: Record<number, [string | null, (_.Many<Type> | null)?, string?]>;
}
