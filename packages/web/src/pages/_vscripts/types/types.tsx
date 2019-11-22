import api from 'dota-data/files/vscripts/api';
import { findTypeByName } from 'dota-data/lib/helpers/vscripts';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { ColoredSyntax, ColoredSyntaxKind, getSyntaxColorFor } from '~components/ColoredSyntax';
import { ActiveLink } from '~components/Link';
import { colors } from '~utils/constants';
import LambdaIcon from './lambda.svg';

const TypeReferenceLink = styled(ActiveLink)`
  color: ${colors.text};

  &.active {
    text-decoration: none;
  }
`;

const TypeReference: React.FC<{ name: string }> = ({ name }) => {
  const [kind, scope, hash] = useMemo((): [ColoredSyntaxKind, string?, string?] => {
    if (name === 'nil') return ['nil'];
    const type = findTypeByName(name);
    if (!type) return ['literal'];
    return [
      'interface',
      type.kind === 'class' || type.kind === 'enum'
        ? name
        : type.kind === 'constant'
        ? 'constants'
        : type.kind === 'function'
        ? 'functions'
        : undefined,
      type.kind === 'constant' || type.kind === 'function' ? name : undefined,
    ];
  }, [name]);

  const urlHash = hash ? `#${hash}` : '';
  return (
    <TypeReferenceLink
      to={scope ? { pathname: '/vscripts', query: { scope }, hash } : undefined}
      toPath={scope ? `/vscripts/${scope}${urlHash}` : undefined}
      style={{ textDecorationColor: getSyntaxColorFor(kind) }}
    >
      <ColoredSyntax kind={kind}>{name}</ColoredSyntax>
    </TypeReferenceLink>
  );
};

const ArrayType: React.FC<{ type: api.Type }> = ({ type }) => (
  <span>
    [<Type type={type} />]
  </span>
);

const Type: React.FC<{ type: api.Type }> = ({ type }) =>
  typeof type === 'string' ? (
    <TypeReference name={type} />
  ) : 'array' in type ? (
    <ArrayType type={type.array} />
  ) : (
    <FunctionType {...type} />
  );

export const Types: React.FC<{ types: api.Type[] }> = ({ types }) => {
  const isNullable = types.includes('nil');
  if (isNullable && types.length === 1) return <Type type="nil" />;

  const realTypes = types.filter(x => x !== 'nil');
  const requiresWrapping = isNullable && realTypes.length > 1;
  return (
    <>
      {requiresWrapping && '('}
      {realTypes.map((type, index) => [
        <Type key={index} type={type} />,
        realTypes.length - 1 !== index && ' | ',
      ])}
      {requiresWrapping && ')'}
      {isNullable && '?'}
    </>
  );
};

export const FunctionParameter: React.FC<{ name: string; types: api.Type[] }> = ({
  name,
  types,
}) => (
  <span>
    <ColoredSyntax kind="parameter">{name}</ColoredSyntax>:&nbsp;
    <Types types={types} />
  </span>
);

const FunctionLambdaIcon = styled(LambdaIcon).attrs({ height: 17, width: 28 })`
  path {
    fill: ${colors.text};
  }
`;

const FunctionType: React.FC<api.FunctionType> = props => (
  <span>
    (
    {props.args.map(x => (
      <FunctionParameter key={x.name} {...x} />
    ))}
    ) <FunctionLambdaIcon /> <Types types={props.returns} />
  </span>
);
