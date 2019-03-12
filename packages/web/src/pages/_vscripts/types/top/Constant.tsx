import enums from 'dota-data/files/vscripts/enums';
import React from 'react';
import styled from 'styled-components';
import { useAnchor } from '~utils/hooks';
import {
  CenteredKindIcon,
  CommonGroupHeader,
  CommonGroupSignature,
  CommonGroupWrapper,
  ElementBadges,
  ElementLink,
  OptionalDescription,
} from '../common';

const ConstantWrapper = styled(CommonGroupWrapper)`
  padding: 5px;
`;
const ConstantHeader = styled(CommonGroupHeader)``;
const ConstantSignature = styled(CommonGroupSignature)`
  font-size: 20px;
`;

export const Constant: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  element: enums.Constant;
}> = ({ className, style, element }) => {
  const ref = useAnchor<HTMLDivElement>(element.name, true);
  return (
    <ConstantWrapper className={className} style={style} ref={ref}>
      <ConstantHeader>
        <ConstantSignature>
          <CenteredKindIcon kind="constant" size="big" />
          {element.name}:&nbsp;{element.value}
        </ConstantSignature>
        <ElementBadges>
          <ElementLink scope="constants" hash={element.name} />
        </ElementBadges>
      </ConstantHeader>
      <OptionalDescription description={element.description} />
    </ConstantWrapper>
  );
};
