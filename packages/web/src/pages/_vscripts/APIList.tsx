/* eslint-disable unicorn/filename-case */
import dynamic from 'next/dynamic';
import React from 'react';
import styled from 'styled-components';
import { MaybeLazyList } from '~components/MaybeLazyList';
import { Declaration, useFilteredData } from './data';
import { SearchBox } from './SearchBox';
import { ClassDeclaration } from './types/top/ClassDeclaration';
import { Constant } from './types/top/Constant';
import { Enum } from './types/top/Enum';
import { FunctionDeclaration } from './types/top/FunctionDeclaration';

const StyledSearchBox = styled(SearchBox)`
  margin: 6px;
`;

const APIListWrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-flow: column;
`;

const TextMessage = styled.div`
  margin-top: 50px;
  align-self: center;
  font-size: 42px;
`;

const listElement = styled.div`
  margin: 6px;
`;
const ListClassDeclaration = listElement.withComponent(ClassDeclaration);
const ListEnum = listElement.withComponent(Enum);
const ListConstant = listElement.withComponent(Constant);
const ListFunctionDeclaration = listElement.withComponent(FunctionDeclaration);

const renderItem = (declaration: Declaration, style?: React.CSSProperties): React.ReactNode => {
  const common = { style, key: declaration.name };
  switch (declaration.kind) {
    case 'class':
      return <ListClassDeclaration {...common} declaration={declaration} />;
    case 'enum':
      return <ListEnum {...common} element={declaration} />;
    case 'constant':
      return <ListConstant {...common} element={declaration} />;
    case 'function':
      return <ListFunctionDeclaration {...common} context="functions" declaration={declaration} />;
  }
};

const SearchList = dynamic<{ data: Declaration[] }>(
  Promise.resolve(({ data }) =>
    data.length > 0 ? (
      <MaybeLazyList isLazy={true} data={data} render={renderItem} />
    ) : (
      <TextMessage>No results found</TextMessage>
    ),
  ),
  { ssr: false, loading: () => null },
);

const ExploreList: React.FC<{ data: Declaration[] }> = ({ data }) =>
  data.length > 0 ? (
    <MaybeLazyList isLazy={false} data={data} render={renderItem} />
  ) : (
    <TextMessage>Choose a category or use the search bar...</TextMessage>
  );

export const APIList: React.FC = () => {
  const { data, isSearching } = useFilteredData();
  return (
    <APIListWrapper>
      <StyledSearchBox />
      {isSearching ? <SearchList data={data} /> : <ExploreList data={data} />}
    </APIListWrapper>
  );
};
