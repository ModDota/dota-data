import api from 'dota-data/files/vscripts/api';
import React from 'react';
import styled from 'styled-components';
import {
  CenteredKindIcon,
  CommonGroupHeader,
  CommonGroupSignature,
  CommonGroupWrapper,
  ElementBadges,
  ElementLink,
} from './common';
import { Types } from './types';

const FieldWrapper = styled(CommonGroupWrapper)`
  padding: 4px;
`;
const FieldHeader = styled(CommonGroupHeader)``;
const FieldSignature = styled(CommonGroupSignature)`
  font-size: 20px;
`;

export const Field: React.FC<{
  className?: string;
  context?: string;
  element: api.Field;
}> = ({ className, context, element }) => (
  <FieldWrapper className={className}>
    <FieldHeader>
      <FieldSignature>
        <CenteredKindIcon kind="field" size="big" />
        {element.name}: {<Types types={element.types} />}
      </FieldSignature>
      <ElementBadges>
        {context && <ElementLink scope={context} hash={element.name} />}
      </ElementBadges>
    </FieldHeader>
  </FieldWrapper>
);
