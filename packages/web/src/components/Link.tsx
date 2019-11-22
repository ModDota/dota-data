import _ from 'lodash';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { UrlLike } from 'next/router';
import React from 'react';
import { useRouter } from '~utils/hooks';

type Props = _.Omit<NextLinkProps, 'children' | 'as' | 'href'> & {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  to?: UrlLike;
  toPath?: NextLinkProps['as'];
};

export const linkClickHandlers = new Set<() => void>();
const BaseLink: React.FC<NextLinkProps> = ({ children, href, as, ...props }) => {
  const child = children; // React.Children.only(children) as React.ReactElement<any>;
  // TODO: Scroll handling
  // const onClick = useCallback<React.MouseEventHandler<never>>(async e => {
  //   e.preventDefault();
  //   const success = await Router.push(href != null ? format(href) : href!, as);
  //   if (success) linkClickHandlers.forEach(h => h());
  // }, []);
  // if (React.isValidElement(child)) child = React.cloneElement(child, { onClick } as any);

  return (
    <NextLink href={href} as={as} {...props}>
      {child}
    </NextLink>
  );
};

export const InactiveLink: React.FC<Props> = ({
  children,
  className,
  style,
  to,
  toPath,
  ...props
}) =>
  to ? (
    <BaseLink as={toPath} href={to} {...props}>
      <a className={className} style={style}>
        {children}
      </a>
    </BaseLink>
  ) : (
    <span className={className} style={style}>
      {children}
    </span>
  );

export const ButtonLink: React.FC<Props> = ({ children, className, style, to, toPath, ...props }) =>
  to ? (
    <BaseLink as={toPath} href={to} {...props}>
      <button className={className} style={style}>
        {children}
      </button>
    </BaseLink>
  ) : (
    <button className={className} style={style}>
      {children}
    </button>
  );

export const ActiveLink: React.FC<Props> = ({ className, to, ...props }) => {
  const { pathname, query } = useRouter();
  const isActive =
    to && pathname === to.pathname && (to.query == null || _.isEqual(query, to.query));
  if (isActive) className += ' active';

  return <InactiveLink className={className} to={to} {...props} />;
};
