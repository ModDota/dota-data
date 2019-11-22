import NextRouter, { SingletonRouter, withRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';

interface Query {
  scope?: string;
  search?: string;
}

export const Router = NextRouter as SingletonRouter<Query>;
export const RouterContext = React.createContext<SingletonRouter<Query> | undefined>(undefined);
export const useRouter = () => useContext(RouterContext)!;
export const InjectRouterContext = withRouter(({ router, children }) => (
  <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
));

export const useForceUpdate = (): (() => void) => (useState as any)()[1];

export const useAnchor = <T extends Element>(id: string, enable: boolean) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!enable) return;
    if (!ref.current) return;
    ref.current.id = id;
    if (window.location.hash === `#${id}`) {
      ref.current.scrollIntoView();
    }
  }, [ref.current, id, enable]);

  return ref;
};

// TODO: Scroll handling
// export const useScrollToTopOnUpdate = <T extends Element>() => {
//   const ref = useRef<T | null>(null);

//   useEffect(() => {
//     const listener = () => {
//       if (ref.current) ref.current.scrollTo(0, 0);
//     };
//     linkClickHandlers.add(listener);
//     return () => linkClickHandlers.delete(listener);
//   }, [ref.current]);

//   return ref;
// };
