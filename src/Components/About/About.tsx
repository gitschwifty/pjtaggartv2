import React from 'react';
import { BodyContainer, HeaderContainer } from '../Container';

class About extends React.Component {
  render() {
    return (
      <React.Fragment>
        <HeaderContainer title='About Me' />
        <BodyContainer>
          <p>I'm a 23 year old software engineer living in Denver.</p>
        </BodyContainer>
      </React.Fragment>
    );
  }
}

export default About;
