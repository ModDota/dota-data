import api from 'dota-data/files/vscripts/api';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useAnchor } from '~utils/hooks';
import { isNotNil } from '~utils/types';
import { getInterfacesForTypes } from '../../data';
import {
  AvailabilityBadge,
  CenteredKindIcon,
  CommonGroupHeader,
  CommonGroupSignature,
  CommonGroupWrapper,
  ElementBadges,
  ElementLink,
  OptionalDescription,
  SearchInGoogle,
  SearchOnGitHub,
} from '../common';
import { InterfaceDeclaration } from '../InterfaceDeclaration';
import { FunctionParameter, Types } from '../types';

const FunctionWrapper = styled(CommonGroupWrapper)`
  padding: 2px 5px;
`;

const FunctionHeader = styled(CommonGroupHeader)``;
const FunctionSignature = styled(CommonGroupSignature)``;

const ParameterDescriptions = styled.ul`
  font-size: 18px;
  margin: 0 30px;
`;

export const FunctionDeclaration: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  context?: string;
  declaration: api.FunctionDeclaration;
}> = ({ className, style, context, declaration }) => {
  const parameterDescriptions = useMemo(
    () =>
      declaration.args
        .map(arg => {
          const interfaces = getInterfacesForTypes(arg.types);
          if (!arg.description && interfaces.length === 0) return null;

          return (
            <li key={arg.name}>
              {arg.name}
              {arg.description && ` - ${arg.description}`}
              {interfaces.map(x => (
                <InterfaceDeclaration key={x.name} declaration={x} />
              ))}
            </li>
          );
        })
        .filter(isNotNil),
    [],
  );

  const ref = useAnchor<HTMLDivElement>(declaration.name, Boolean(context));
  return (
    <FunctionWrapper className={className} style={style} ref={ref}>
      <FunctionHeader>
        <FunctionSignature>
          <CenteredKindIcon kind="function" size="big" />
          {declaration.name}(
          {declaration.args.map((x, i) => [
            <FunctionParameter key={x.name} name={x.name} types={x.types} />,
            i === declaration.args.length - 1 ? null : ', ',
          ])}
          ):&nbsp;{<Types types={declaration.returns} />}
        </FunctionSignature>
        <ElementBadges>
          <AvailabilityBadge available={declaration.available} />
          <SearchOnGitHub name={declaration.name} />
          <SearchInGoogle name={declaration.name} />
          {context && <ElementLink scope={context} hash={declaration.name} />}
        </ElementBadges>
      </FunctionHeader>
      {parameterDescriptions.length > 0 && (
        <ParameterDescriptions>{parameterDescriptions}</ParameterDescriptions>
      )}
      <OptionalDescription description={declaration.description} />
    </FunctionWrapper>
  );
};
