import api from 'dota-data/files/vscripts/api';
import enums from 'dota-data/files/vscripts/enums';
import _ from 'lodash';
import { useRouter } from '~utils/hooks';
import { doSearch, useRouterSearch } from './search';

const allData = [...api, ...enums];
export type TopLevelElement = (typeof topLevelData)[number];
export const topLevelData = allData.filter(
  <T extends { kind: string }>(x: T | api.Interface): x is T => x.kind !== 'interface',
);

export const useFilteredData = () => {
  const search = useRouterSearch();
  const { query: { scope = '' } = {} } = useRouter();

  let data = [...topLevelData];
  if (search) {
    return { data: doSearch(data, search.toLowerCase().split(' ')), isSearching: true };
  }

  switch (scope) {
    case 'functions':
      data = data.filter(x => x.kind === 'function');
      break;
    case 'constants':
      data = data.filter(x => x.kind === 'constant');
      break;
    default:
      data = data.filter(x => x.name === scope);
  }
  return { data, isSearching: false };
};

const interfaces = _.fromPairs(
  api.filter((x): x is api.Interface => x.kind === 'interface').map(x => [x.name, x]),
);
export const getInterfacesForTypes = (types: api.Type[]): api.Interface[] => {
  const unpackedTypes = types.map(type =>
    typeof type === 'object' && 'array' in type ? type.array : type,
  ) as Exclude<api.Type, api.ArrayType>[];
  return _.union(
    unpackedTypes
      .filter(_.isString)
      .map(type => interfaces[type])
      .filter(type => type != null),
    ...unpackedTypes
      .filter((x): x is api.FunctionType => typeof x === 'object')
      .map(func => getInterfacesForTypes([..._.flatMap(func.args, x => x.types), ...func.returns])),
  );
};
