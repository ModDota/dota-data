import api from '../../files/vscripts/api';
import apiTypes from '../../files/vscripts/api-types';
import enums from '../../files/vscripts/enums';
import { assertNever } from '../utils/core';

export { api, enums };

export type AllDataType = api.Declaration | enums.Declaration;
export const allData: AllDataType[] = [...api, ...enums];

const dataAndTypes = [...allData, ...apiTypes];
export const findTypeByName = (name: string): AllDataType | apiTypes.Declaration | undefined =>
  dataAndTypes.find((x) => x.name === name);

export const getFuncDeepTypes = (func: api.FunctionType): string[] =>
  getDeepTypes([...func.args.flatMap((x) => x.types), ...func.returns]);

export function getDeepTypes(types: api.Type[]): string[] {
  const allTypes = new Set<string>();

  function walkType(type: api.Type) {
    if (typeof type === 'string') {
      allTypes.add(type);
    } else if (type.kind === 'literal') {
      // Ignore
    } else if (type.kind === 'table') {
      type.key.forEach(walkType);
      type.value.forEach(walkType);
    } else if (type.kind === 'array') {
      type.types.forEach(walkType);
    } else if (type.kind === 'function') {
      getFuncDeepTypes(type).forEach((t) => allTypes.add(t));
    } else {
      assertNever(type);
    }
  }

  types.forEach(walkType);

  return [...allTypes];
}
