import React from 'react';
import Home from './Home';
import Page from '../Page';

export default class extends React.Component {
  public render() {
    return (
      <Page>
        <Home />
      </Page>
    );
  }
}
