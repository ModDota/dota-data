// import { darken } from 'polished';
import React from 'react';
import styled from 'styled-components';
import { colors } from '~utils/constants';
// import { ActiveLink } from '../Link';

// const NavBarLink = styled(ActiveLink)`
//   background-color: ${darken(0.05, colors.mainLight)};
//   padding: 10px 12px;
//   color: ${colors.text};
//   border: 1px solid black;
//   margin: 0 3px;
//   text-decoration: none;

//   &.active {
//     background-color: ${darken(0.12, colors.mainLight)};
//     color: ${darken(0.1, colors.text)};
//   }
// `;

// const NavBarButton: React.FC<{ to: string; name: string }> = props => (
//   <NavBarLink to={{ pathname: `/${props.to}` }} toPath={`/${props.to}`}>
//     {props.name}
//   </NavBarLink>
// );

const NavBarWrapper = styled.div`
  display: flex;
  background-color: ${colors.mainLight};
`;

export const NavBar = React.memo(() => (
  <NavBarWrapper>
    {/* <NavBarButton to="vscripts" name="VScripts API" />
    <NavBarButton to="panorama" name="Panorama API" />
    <span style={{ width: 50 }} />
    <NavBarButton to="abilities" name="Abilities" />
    <NavBarButton to="units" name="Units" />
    <NavBarButton to="heroes" name="Heroes" />
    <NavBarButton to="localization" name="Localization" /> */}
  </NavBarWrapper>
));
