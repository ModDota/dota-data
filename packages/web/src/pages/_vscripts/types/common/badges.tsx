import { Availability } from 'dota-data/files/vscripts/api';
import { darken } from 'polished';
import React from 'react';
import styled from 'styled-components';
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

const AvailabilityBadgeWrapper = styled.div`
  border: 1px solid lime;
  border-radius: 5px;
  font-size: 17px;
  padding: 2px 5px;
  align-self: flex-start;
  user-select: none;
`;

export const AvailabilityBadge: React.FC<{ available: Availability }> = ({ available }) =>
  available === 'both' ? <AvailabilityBadgeWrapper>Client</AvailabilityBadgeWrapper> : null;

export const SearchOnGitHub: React.FC<{ name: string }> = ({ name }) => {
  const query = encodeURIComponent(`path:vscripts ${name}`);
  const href = `https://github.com/search?l=Lua&q=${query}&type=Code`;
  return (
    <a target="_blank" href={href} title="Search on GitHub">
      <SearchGitHubIcon width={32} height={32} />
    </a>
  );
};

export const SearchInGoogle: React.FC<{ name: string }> = ({ name }) => {
  const query = encodeURIComponent(`site:github.com inurl:vscripts "${name}"`);
  const href = `https://www.google.com/search?q=${query}`;
  return (
    <a target="_blank" href={href} title="Search on GitHub">
      <SearchGoogleIcon width={32} height={32} />
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
  const urlHash = hash ? '#' + hash : '';
  return (
    <StyledElementLink
      to={{ pathname: '/vscripts', query: { scope, hash } }}
      toPath={`/vscripts/${scope}${urlHash}`}
    >
      #
    </StyledElementLink>
  );
};
