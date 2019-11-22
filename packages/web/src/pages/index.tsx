import Router from 'next/router';
import React, { useEffect } from 'react';

export default () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Router.push('/vscripts');
  });
  return <></>;
};
