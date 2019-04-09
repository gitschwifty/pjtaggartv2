import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { ButtonLink } from '../Button';
import TopNavMenu from './TopNavMenu';
import { Link } from 'react-router-dom';

class TopNav extends React.Component {
  public render() {
    return (
      <div id='top_nav_container'>
        <Toolbar style={{ maxHeight: '48px', minHeight: '48px' }}>
          <ButtonLink to='/' style={{ fontSize: '20px', fontWeight: 'bold' }}>
            PJT
          </ButtonLink>
          <div id='topnav_right'>
            <TopNavMenu title='Steem'>
              <Link style={{ textDecoration: 'none' }} to='/witnesses'>
                Witness Ranking
              </Link>
              <Link style={{ textDecoration: 'none' }} to='/witness-schedule'>
                Witness Schedule
              </Link>
              <Link style={{ textDecoration: 'none' }} to='/profile'>
                My Steem Profile
              </Link>
            </TopNavMenu>
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
