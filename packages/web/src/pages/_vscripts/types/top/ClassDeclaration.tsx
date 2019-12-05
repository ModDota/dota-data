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
  declaration: api.ClassDeclaration;
}> = ({ className, style, declaration }) => (
  <ClassWrapper className={className} style={style}>
    <ClassHeader>
      <ClassSignature>
        <CenteredKindIcon kind="class" size="big" />
        <ClassName>{declaration.name}</ClassName>
        &nbsp;
        {declaration.extend && <ClassExtends extend={declaration.extend} />}
      </ClassSignature>
      <ElementBadges>
        <AvailabilityBadge available={declaration.clientName != null ? 'both' : 'server'} />
        <FindReferencesButton name={declaration.name} />
        <ElementLink scope={declaration.name} />
      </ElementBadges>
    </ClassHeader>
    <ClassDescription description={declaration.description} />
    {declaration.members.length > 0 && (
      <ClassMembers>
        {declaration.members.map(member =>
          member.kind === 'field' ? (
            <Field key={member.name} element={member} context={declaration.name} />
          ) : (
            <FunctionDeclaration
              key={member.name}
              declaration={member}
              context={declaration.name}
            />
          ),
        )}
      </ClassMembers>
    )}
  </ClassWrapper>
);
