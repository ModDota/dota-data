import _ from 'lodash';
import * as apiTypes from '../types';

export const array = (types: _.Many<apiTypes.Type>): apiTypes.ArrayType => ({
  kind: 'array',
  types: _.castArray(types),
});

export const func = (
  args: [string, _.Many<apiTypes.Type>][],
  returns: _.Many<apiTypes.Type>,
): apiTypes.FunctionType => ({
  kind: 'function',
  returns: _.castArray(returns),
  args: args.map(
    ([name, types]): apiTypes.FunctionParameter => ({ name, types: _.castArray(types) }),
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
