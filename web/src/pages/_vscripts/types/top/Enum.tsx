import api from 'dota-data/files/vscripts/enums';
import React from 'react';
import styled from 'styled-components';
import { ColoredSyntax } from '~components/ColoredSyntax';
import {
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

const EnumMemberWrapper = styled(CommonGroupWrapper)`
  padding: 2px 5px;
`;

const EnumMemberHeader = styled(CommonGroupHeader)``;
const EnumMemberSignature = styled(CommonGroupSignature)``;

const EnumMember: React.FC<api.EnumMember> = props => (
  <EnumMemberWrapper>
    <EnumMemberHeader>
      <EnumMemberSignature>
        {props.name} = <ColoredSyntax kind="literal">{props.value}</ColoredSyntax>
      </EnumMemberSignature>
    </EnumMemberHeader>
    <OptionalDescription description={props.description} />
  </EnumMemberWrapper>
);

const EnumHeader = styled(CommonGroupHeader)`
  padding: 5px;
`;
const EnumSignature = styled(CommonGroupSignature)``;
const EnumWrapper = styled(CommonGroupWrapper)``;
const EnumMembers = styled(CommonGroupMembers)`
  > :not(:last-child) {
    margin-bottom: 2px;
  }
`;

export const Enum: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  element: api.Enum;
}> = ({ className, style, element }) => (
  <EnumWrapper className={className} style={style}>
    <EnumHeader>
      <EnumSignature>
        <CenteredKindIcon kind="enum" size="big" />
        {element.name}
      </EnumSignature>
      <ElementBadges>
        <FindReferencesButton name={element.name} />
        <ElementLink scope={element.name} />
      </ElementBadges>
    </EnumHeader>
    <OptionalDescription description={element.description} />
    {element.members.length > 0 && (
      <EnumMembers>
        {element.members.map(member => (
          <EnumMember key={member.name} {...member} />
        ))}
      </EnumMembers>
    )}
  </EnumWrapper>
);
