import ErrorPage from 'next/error';
import React from 'react';

export default class MyErrorPage extends ErrorPage {
  public render() {
    return (
      <div style={{ flex: 1 }}>
        <ErrorPage statusCode={this.props.statusCode} />
      </div>
    );
  }
}
