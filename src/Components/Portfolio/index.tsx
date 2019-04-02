import React from 'react';
import Portfolio from './Portfolio';
import Page from '../Page';
import Helmet from 'react-helmet';

export default class extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Portfolio</title>
        </Helmet>
        <Page>
          <Portfolio />
        </Page>
      </React.Fragment>
    );
  }
}
