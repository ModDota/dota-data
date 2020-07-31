import api from '../../files/vscripts/api';
import apiTypes from '../../files/vscripts/api-types';
import enums from '../../files/vscripts/enums';

export { api, enums };

export type AllDataType = api.Declaration | enums.Declaration;
export const allData: AllDataType[] = [...api, ...enums];

export const findTypeByName = (name: string): AllDataType | apiTypes.Declaration | undefined =>
  // TODO: Throw when not found?
  allData.find(x => x.name === name);

export const getFuncDeepTypes = (func: api.FunctionType): string[] =>
  getDeepTypes([...func.args.flatMap(x => x.types), ...func.returns]);

export function getDeepTypes(types: api.Type[]): string[] {
  const allTypes = new Set<string>();

  function walkType(type: api.Type) {
    if (typeof type === 'string') {
      allTypes.add(type);
    } else if ('array' in type) {
      walkType(type.array);
    } else {
      getFuncDeepTypes(type).forEach(t => allTypes.add(t));
    }
  }

  types.forEach(walkType);

  return [...allTypes];
}
