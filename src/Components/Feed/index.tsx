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
          <title>Blog</title>
        </Helmet>
        <Page>
          <HeaderContainer title='Posts (Under Reconstruction Due to STEEM&lquot;s Governance Issues)' />
          <BodyContainer>
            <Feed />
          </BodyContainer>
        </Page>
      </React.Fragment>
    );
  }
}
