import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { ButtonLink } from '../Button';
import { Link } from 'react-router-dom';

class TopNav extends React.Component {
  public render() {
    return (
      <div id='top_nav_container'>
        <Toolbar>
          <ButtonLink to='/' style={{ fontSize: '24px', fontWeight: 'bold' }}>
            PJT
          </ButtonLink>
          <div id='topnav_right'>
            <ButtonLink to='/portfolio'>Portfolio</ButtonLink>
            <ButtonLink to='/feed'>Posts</ButtonLink>
            <ButtonLink to='/about'>About Me</ButtonLink>
          </div>
        </Toolbar>
      </div>
    );
  }
}

export default TopNav;
