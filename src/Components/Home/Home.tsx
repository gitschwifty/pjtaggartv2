import React from 'react';
import { Link } from 'react-router-dom';
import { BodyContainer, HeaderContainer } from '../Container';
import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BodyContainer>
          <h3 className='home_header'>
            <Link to='/portfolio' className='home_link'>
              Portfolio
            </Link>
          </h3>

          <p className='home_link_description'>
            A sampling of my programming projects.
          </p>

          <h3 className='home_header'>
            <Link to='/feed' className='home_link'>
              My Feed
            </Link>
          </h3>

          <p className='home_link_description'>Recent Steem Posts</p>

          <h3 className='home_header'>
            <Link to='/about' className='home_link'>
              About Me
            </Link>
          </h3>

          <p className='home_link_description'>Some information about me.</p>
        </BodyContainer>
      </React.Fragment>
    );
  }
}

export default Home;
