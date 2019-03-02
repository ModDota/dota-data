import React from 'react';
import styled from 'styled-components';
import { MaybeLazyList } from '~components/MaybeLazyList';
import { TopLevelElement, useFilteredData } from './data';
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

export const APIList: React.FC = () => {
  const { data, isSearching } = useFilteredData();
  const render = (e: TopLevelElement, style?: React.CSSProperties): React.ReactNode => {
    const commonProps = { style, key: e.name };
    switch (e.kind) {
      case 'class':
        return <ListClassDeclaration {...commonProps} element={e} />;
      case 'enum':
        return <ListEnum {...commonProps} element={e} />;
      case 'constant':
        return <ListConstant {...commonProps} element={e} />;
      case 'function':
        return <ListFunctionDeclaration {...commonProps} context="functions" element={e} />;
    }
  };

  return (
    <APIListWrapper>
      <StyledSearchBox />
      {data.length > 0 ? (
        <MaybeLazyList isLazy={isSearching} data={data} render={render} />
      ) : isSearching ? (
        <TextMessage>No results found</TextMessage>
      ) : (
        <TextMessage>Choose a category or use the search bar...</TextMessage>
      )}
    </APIListWrapper>
  );
};
