import React from 'react';
import Home from './Home';
import Page from '../Page';
import Helmet from 'react-helmet';

export default class extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Taggart</title>
        </Helmet>
        <Page>
          <Home />
        </Page>
      </React.Fragment>
    );
  }
}
