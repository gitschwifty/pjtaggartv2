import React from 'react';
import { BodyContainer, HeaderContainer } from '../Container';
import './About.css';

class About extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <HeaderContainer title='Peter James Taggart' />
        <BodyContainer>
          <p className='about_para'>
            I'm a 23 year old software engineer living in Denver. I've worked in
            many languages, with experience in C, C++, Javascript, Typescript,
            Python, and Java. I've also worked with several different
            frameworks, including nginx, puma, electron, React, FLTK, and
            probably more. My current main interest is in blockchain
            development, and I've done a couple of projects on top of the
            blockchain, but none that involve working on the chain itself. I'm
            currently working at Animatra Inc. on{' '}
            <a href='https://lumiate.co'>Lumiate</a>, a Mindfulness app
            utilizing a patented color overlay effect. I built most of the app
            myself, using an Electron/React setup, with redux, firebase auth,
            api usage, and more. I'm not currently interested in a new job, but
            if you've got an interesting blockchain project or idea, I might
            help out a bit.
          </p>
        </BodyContainer>
      </React.Fragment>
    );
  }
}

export default About;
