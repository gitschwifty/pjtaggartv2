import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { ButtonLink } from '../Button';

class TopNav extends React.Component {
  render() {
    return (
      <div id='top_nav_container'>
        <Toolbar>
          <h3>Peter Taggart</h3>
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
