import React from 'react';
import Profile from './Profile';
import Page from '../Page';
import { HeaderContainer, BodyContainer } from '../Container';
import Helmet from 'react-helmet';

export default class extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>@petertag</title>
        </Helmet>
        <Page>
          <HeaderContainer title='@petertag' />
          <BodyContainer>
            <Profile />
          </BodyContainer>
        </Page>
      </React.Fragment>
    );
  }
}
