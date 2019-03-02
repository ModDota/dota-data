import App, { Container } from 'next/app';
import React from 'react';
import { Layout } from '~components/Layout';
import { InjectRouterContext } from '~utils/hooks';

export default class MyApp extends App {
  public render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <InjectRouterContext>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </InjectRouterContext>
      </Container>
    );
  }
}
