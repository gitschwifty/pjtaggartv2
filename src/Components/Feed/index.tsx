import React from 'react';
import Feed from './Feed';
import Page from '../Page';
import { HeaderContainer, BodyContainer } from '../Container';
import Helmet from 'react-helmet';

export default class extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Post Feed</title>
        </Helmet>
        <Page>
          <HeaderContainer title='Posts' />
          <BodyContainer>
            <Feed />
          </BodyContainer>
        </Page>
      </React.Fragment>
    );
  }
}
