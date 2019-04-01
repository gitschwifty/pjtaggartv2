import React from 'react';
import { BodyContainer, HeaderContainer } from '../Container';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <HeaderContainer title='Peter James Taggart' />
        <BodyContainer>
          <p>Words words words...</p>
        </BodyContainer>
      </React.Fragment>
    );
  }
}

export default Home;
