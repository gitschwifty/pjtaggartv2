import React from 'react';
import Helmet from 'react-helmet';
import Page from '../Page';
import WitnessSchedule from './WitnessSchedule';
import { BodyContainer, HeaderContainer } from '../Container';

export default class extends React.PureComponent {
  public render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Witness Schedule</title>
        </Helmet>
        <Page>
          <HeaderContainer title='Witness Schedule' />
          <BodyContainer>
            <WitnessSchedule />
          </BodyContainer>
        </Page>
      </React.Fragment>
    );
  }
}
