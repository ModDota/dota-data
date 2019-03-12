import api from 'dota-data/files/vscripts/api';
import React from 'react';
import styled from 'styled-components';
import {
  AvailabilityBadge,
  CenteredKindIcon,
  CommonGroupHeader,
  CommonGroupMembers,
  CommonGroupSignature,
  CommonGroupWrapper,
  ElementBadges,
  ElementLink,
  FindReferencesButton,
  OptionalDescription,
} from '../common';
import { Field } from '../Field';
import { Types } from '../types';
import { FunctionDeclaration } from './FunctionDeclaration';

const ClassWrapper = styled(CommonGroupWrapper)``;
const ClassHeader = styled(CommonGroupHeader)`
  padding: 5px;
`;
const ClassSignature = styled(CommonGroupSignature)``;

const ClassName = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

const ClassExtendsWrapper = styled.span`
  font-size: 16px;
`;

const ClassExtends: React.FC<{ extend: string }> = ({ extend }) => (
  <ClassExtendsWrapper>
    extends <Types types={[extend]} />
  </ClassExtendsWrapper>
);

const ClassDescription = styled(OptionalDescription)`
  font-size: 18px;
  margin: 5px 20px;
`;

const ClassMembers = styled(CommonGroupMembers)`
  > :not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const ClassDeclaration: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  element: api.Class;
}> = ({ className, style, element }) => (
  <ClassWrapper className={className} style={style}>
    <ClassHeader>
      <ClassSignature>
        <CenteredKindIcon kind="class" size="big" />
        <ClassName>{element.name}</ClassName>
        &nbsp;
        {element.extend && <ClassExtends extend={element.extend} />}
      </ClassSignature>
      <ElementBadges>
        <AvailabilityBadge available={element.clientName != null ? 'both' : 'server'} />
        <FindReferencesButton name={element.name} />
        <ElementLink scope={element.name} />
      </ElementBadges>
    </ClassHeader>
    <ClassDescription description={element.description} />
    {element.members.length > 0 && (
      <ClassMembers>
        {element.members.map(member =>
          member.kind === 'field' ? (
            <Field key={member.name} element={member} context={element.name} />
          ) : (
            <FunctionDeclaration key={member.name} element={member} context={element.name} />
          ),
        )}
      </ClassMembers>
    )}
  </ClassWrapper>
);
