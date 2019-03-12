import api from 'dota-data/files/vscripts/api';
import React from 'react';
import styled from 'styled-components';
import { CenteredKindIcon, CommonGroupMembers, CommonGroupWrapper } from './common';
import { Field } from './Field';
import { FunctionDeclaration } from './top/FunctionDeclaration';

const InterfaceWrapper = styled(CommonGroupWrapper)``;
const InterfaceHeader = styled.div`
  padding: 4px;
`;

const InterfaceName = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const InterfaceDescription = styled.div`
  font-size: 18px;
  margin: 5px 20px;
`;

const InterfaceMembers = styled(CommonGroupMembers)`
  > :not(:last-child) {
    margin-bottom: 1px;
  }
`;

export const InterfaceDeclaration: React.FC<{
  className?: string;
  element: api.Interface;
}> = ({ className, element }) => (
  <InterfaceWrapper className={className}>
    <InterfaceHeader>
      <CenteredKindIcon kind="interface" size="small" />
      <InterfaceName>{element.name}</InterfaceName>
    </InterfaceHeader>
    {element.description && <InterfaceDescription>{element.description}</InterfaceDescription>}
    {element.members.length > 0 && (
      <InterfaceMembers>
        {element.members.map(member =>
          member.kind === 'field' ? (
            <Field key={member.name} element={member} />
          ) : (
            <FunctionDeclaration key={member.name} element={member} />
          ),
        )}
      </InterfaceMembers>
    )}
  </InterfaceWrapper>
);
