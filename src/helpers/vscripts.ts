import _ from 'lodash';
import api from '../../files/vscripts/api';
import enums from '../../files/vscripts/enums';

export { api, enums };

export const allData = [...api, ...enums];
export type AllDataType = typeof allData[number];
export const findTypeByName = (name: string): AllDataType | undefined =>
  allData.find(x => x.name === name);

export const getFuncDeepTypes = (func: api.FunctionType): string[] =>
  getDeepTypes([..._.flatMap(func.args, x => x.types), ...func.returns]);

export const getDeepTypes = (types: api.Type[]): string[] => {
  const unpackedTypes = types.map(type =>
    typeof type === 'object' && 'array' in type ? type.array : type,
  ) as Exclude<api.Type, api.ArrayType>[];
  return _.union(
    unpackedTypes.filter(_.isString),
    ...unpackedTypes
      .filter((x): x is api.FunctionType => typeof x === 'object')
      .map(getFuncDeepTypes),
  );
};
