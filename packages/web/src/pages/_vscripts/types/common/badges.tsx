import { Availability } from 'dota-data/files/vscripts/api';
import { darken } from 'polished';
import React from 'react';
import styled, { css } from 'styled-components';
import { ButtonLink, InactiveLink } from '~components/Link';
import { colors } from '~utils/constants';
import SearchGitHubIcon from './search-github.svg';
import SearchGoogleIcon from './search-google.svg';

export const ElementBadges = styled.div`
  display: flex;
  > * {
    margin-left: 5px;
  }
`;

const AvailabilityBadgeBox = styled.div<{ color: string; active: boolean }>`
  margin-top: 3px;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 1;
  width: 20px;
  height: 20px;
  text-align: center;
  user-select: none;
  background: radial-gradient(${props => props.color}, ${props => darken(0.22, props.color)});

  ${props =>
    !props.active &&
    css`
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.7);
      filter: saturate(10%);
    `}
`;

export const AvailabilityBadge: React.FC<{ available: Availability }> = ({ available }) => {
  const onServer = available === 'server' || available === 'both';
  const onClient = available === 'client' || available === 'both';
  return (
    <>
      <AvailabilityBadgeBox color="#5b82ee" active={onServer}>
        s
      </AvailabilityBadgeBox>
      <AvailabilityBadgeBox color="#59df37" active={onClient}>
        c
      </AvailabilityBadgeBox>
    </>
  );
};

export const SearchOnGitHub: React.FC<{ name: string }> = ({ name }) => {
  const query = encodeURIComponent(`path:vscripts ${name}`);
  const href = `https://github.com/search?l=Lua&q=${query}&type=Code`;
  return (
    <a target="_blank" href={href} title="Search on GitHub">
      <SearchGitHubIcon width={30} height={30} />
    </a>
  );
};

export const SearchInGoogle: React.FC<{ name: string }> = ({ name }) => {
  const query = encodeURIComponent(`site:github.com inurl:vscripts "${name}"`);
  const href = `https://www.google.com/search?q=${query}`;
  return (
    <a target="_blank" href={href} title="Search on GitHub">
      <SearchGoogleIcon width={30} height={30} />
    </a>
  );
};

const FindReferencesButtonLink = styled(ButtonLink)`
  background-color: ${darken(0.05, colors.mainLight)};
  color: ${colors.text};
  border: 1px solid black;
  text-decoration: none;
  padding: 4px 6px;
  font-size: 16px;
`;
export const FindReferencesButton: React.FC<{ name: string }> = ({ name }) => {
  const search = `type:${name}`;
  return (
    <FindReferencesButtonLink
      to={{ pathname: '/vscripts', query: { search } }}
      toPath={`/vscripts?search=${search}`}
    >
      Find References
    </FindReferencesButtonLink>
  );
};

const StyledElementLink = styled(InactiveLink)`
  font-size: 26px;
  line-height: 1;
  text-decoration: none;
  color: ${colors.text};
  user-select: none;
`;

export const ElementLink: React.FC<{ scope: string; hash?: string }> = ({ scope, hash }) => {
  const urlHash = hash ? `#${hash}` : '';
  return (
    <StyledElementLink
      to={{ pathname: '/vscripts', query: { scope, hash } }}
      toPath={`/vscripts/${scope}${urlHash}`}
    >
      #
    </StyledElementLink>
  );
};
