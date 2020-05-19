import _ from 'lodash';
import * as apiTypes from '../types';

export const array = (of: apiTypes.Type): apiTypes.ArrayType => ({ array: of });

export const func = (
  args: [string, _.Many<apiTypes.Type>][],
  returns: _.Many<apiTypes.Type>,
): apiTypes.FunctionType => ({
  returns: _.castArray(returns),
  args: args.map(
    ([name, type]): apiTypes.FunctionParameter => ({ name, types: _.castArray(type) }),
  ),
});

export interface ExtensionClass {
  description?: string;
  members?: apiTypes.ClassMember[];
}

export interface ExtensionFunction {
  deprecated?: string;
  description?: string | ((original?: string) => string);
  returns?: _.Many<apiTypes.Type>;
  args?: Record<number, [string | null, (_.Many<apiTypes.Type> | null)?, string?]>;
}
