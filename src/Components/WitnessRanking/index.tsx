import React from 'react';
import Helmet from 'react-helmet';
import Page from '../Page';
import WitnessRanking from './WitnessRanking';
import { BodyContainer, HeaderContainer } from '../Container';

export default class extends React.PureComponent {
  public render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Steem Witnesses</title>
        </Helmet>
        <Page>
          <HeaderContainer title='Steem Witnesses' />
          <BodyContainer>
            <WitnessRanking />
          </BodyContainer>
        </Page>
      </React.Fragment>
    );
  }
}
