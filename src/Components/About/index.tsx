import React from 'react';
import Helmet from 'react-helmet';
import About from './About';
import Page from '../Page';

export default class extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>About Me</title>
        </Helmet>
        <Page>
          <About />
        </Page>
      </React.Fragment>
    );
  }
}
