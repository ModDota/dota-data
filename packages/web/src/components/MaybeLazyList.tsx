import React, { useCallback, useMemo } from 'react';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  ListRowRenderer,
} from 'react-virtualized';
import { IS_CLIENT } from '~utils/constants';

interface Props<T> {
  data: T[];
  render(element: T, style?: React.CSSProperties): React.ReactNode;
  isLazy: boolean;
}

const LazyList = <T extends any>({ data, render }: Pick<Props<T>, 'data' | 'render'>) => {
  const cache = useMemo(() => new CellMeasurerCache({ fixedWidth: true }), [data]);
  const renderRow = useCallback<ListRowRenderer>(
    ({ key, parent, style, index }) => (
      <CellMeasurer cache={cache} key={key} parent={parent} rowIndex={index}>
        {render(data[index], style)}
      </CellMeasurer>
    ),
    [cache, render, data],
  );

  return (
    <div style={{ flex: 1, overflowX: 'hidden' }}>
      <AutoSizer>
        {size => (
          <List
            style={{ overflowX: 'hidden' }}
            {...size}
            deferredMeasurementCache={cache}
            tabIndex={null}
            overscanRowCount={2}
            rowCount={data.length}
            rowHeight={cache.rowHeight}
            rowRenderer={renderRow}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export const MaybeLazyList = <T extends any>({ data, render, isLazy }: Props<T>) => {
  if (!isLazy) {
    return (
      <div style={{ flex: 1, overflowX: 'hidden', overflowY: 'scroll' }}>
        {data.map(x => render(x))}
      </div>
    );
  }

  return IS_CLIENT ? <LazyList data={data} render={render} /> : null;
};
