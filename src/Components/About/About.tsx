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
            I&lquot;m a 24 year old software engineer living in Denver. I&lquot;ve worked in
            many languages, with experience in C, C++, Typescript, Rust,
            Python, and Java. I&lquot;ve also worked with several different
            frameworks, including nginx, puma, electron, React, FLTK, and
            probably more. Managed systems I&lquot;ve worked with include Firebase,
            AWS, GCP, and Azure, using SQL, Firestore,
            and EC2 servers running Linux that I setup backend systems on.
            I currently work at <a href="manybuildsolutions.com">ManyBuild</a>as the
            Director of Engineering, where I built the market website in React-TSX &amp;
            am currently building a mobile app using React-Native with Typescript.
            My current main interest is in blockchain
            development, and I&lquot;ve done a couple of projects on top of the
            blockchain, but none that involve working on the chain itself. 
            I&lquot;m currently working
          </p>
        </BodyContainer>
      </React.Fragment>
    );
  }
}

export default About;
