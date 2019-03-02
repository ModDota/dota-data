import React from 'react';
import styled from 'styled-components';
import { colors } from '~utils/constants';

export const CommonGroupWrapper = styled.div`
  display: flex;
  flex-flow: column;
  border: 1px solid black;
  background-color: ${colors.mainLight};
`;

export const CommonGroupMembers = styled.div`
  border-top: 1px solid black;
  background-color: ${colors.mainDark};
  padding: 8px;
`;

export const CommonGroupHeader = styled.div`
  display: flex;
`;

export const CommonGroupSignature = styled.div`
  flex: 1;
  font-size: 24px;
`;

const DescriptionSeparator = styled.hr`
  margin: 6px 10px;
  background-color: ${colors.lightest};
`;

export const OptionalDescription: React.FC<{
  className?: string;
  description?: string;
}> = ({ className, description }) => (
  <>
    {description && <DescriptionSeparator />}
    {description && <div className={className}>{description}</div>}
  </>
);
