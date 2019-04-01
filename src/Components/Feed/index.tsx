import React from 'react';
import Feed from './Feed';
import Page from '../Page';
import { HeaderContainer, BodyContainer } from '../Container';

export default class extends React.Component {
  render() {
    return (
      <Page>
        <HeaderContainer title='Posts' />
        <BodyContainer>
          <Feed />
        </BodyContainer>
      </Page>
    );
  }
}
