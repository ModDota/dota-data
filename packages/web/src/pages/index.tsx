import Router from 'next/router';
import React, { useEffect } from 'react';

export default () => {
  useEffect(() => {
    // tslint:disable-next-line: no-floating-promises
    Router.push('/vscripts');
  });
  return <></>;
};
