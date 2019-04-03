import React from 'react';
import Page from '../Page';
import Helmet from 'react-helmet';
import { BodyContainer, HeaderContainer } from '../Container';

export default class FourOhFour extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>404</title>
        </Helmet>
        <Page>
          <HeaderContainer title='Page Not Found' />
          <BodyContainer>
            <p style={{ textAlign: 'center' }}>
              Can't seem to find the page you're looking for.
            </p>
          </BodyContainer>
        </Page>
      </React.Fragment>
    );
  }
}
