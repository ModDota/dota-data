import _ from 'lodash';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { colors } from '~utils/constants';
import { NavBar } from './NavBar';

_.memoize.Cache = WeakMap;

const GlobalStyles = createGlobalStyle`
  html,
  body,
  #__next {
    margin: 0;
    width: 100%;
    height: 100%;
  }
`;

const LayoutWrapper = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  background-color: ${colors.background};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  color: ${colors.text};
`;

const PageContent = styled.div`
  display: flex;
  flex: 1;
  flex-flow: row;
  height: 100%;
`;

export const Layout: React.FC = ({ children }) => (
  <LayoutWrapper>
    <GlobalStyles />
    <NavBar />
    <PageContent>{children}</PageContent>
  </LayoutWrapper>
);
