import { darken } from 'polished';
import React from 'react';
import styled from 'styled-components';
import { IconKind, KindIcon } from '~components/KindIcon';
import { ActiveLink } from '~components/Link';
import { colors } from '~utils/constants';
import { topLevelData } from './data';

const ElementLink = styled(ActiveLink)`
  padding: 2px;
  border: 1px solid black;
  background-color: ${colors.mainLight};
  text-decoration: none;
  color: ${colors.text};

  :not(:last-child) {
    margin-top: 3px;
  }

  &:hover {
    background-color: ${darken(0.1, colors.mainLight)};
  }

  &.active {
    background-color: ${darken(0.2, colors.mainLight)};
  }
`;

const OverviewListElement: React.FC<{
  to: string;
  icon: IconKind;
  text: string;
}> = React.memo(({ to, icon, text }) => (
  <ElementLink to={{ pathname: '/vscripts', query: { scope: to } }} toPath={`/vscripts/${to}`}>
    <KindIcon kind={icon} size="small" /> {text}
  </ElementLink>
));

const OverviewListWrapper = styled.div`
  display: flex;
  flex-flow: column;
  overflow-y: scroll;
  height: 100%;
  padding: 4px 8px;
`;

const OverviewList: React.FC = () => (
  <OverviewListWrapper>
    <OverviewListElement to="functions" icon="function" text="Functions" />
    <OverviewListElement to="constants" icon="constant" text="Constants" />
    {topLevelData
      .filter(x => x.kind === 'class' || x.kind === 'enum')
      .map(({ name, kind }) => (
        <OverviewListElement key={name} to={name} icon={kind} text={name} />
      ))}
  </OverviewListWrapper>
);

const NavigationSidebarWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 20%;
  height: 100%;
`;

export const NavigationSidebar: React.FC = React.memo(() => (
  <NavigationSidebarWrapper>
    <OverviewList />
  </NavigationSidebarWrapper>
));
