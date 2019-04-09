import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Portfolio from '../Portfolio';
import Feed from '../Feed';
import About from '../About';
import Post from '../Post';
import FourOhFour from './404';
import Profile from '../SteemProfile';
import WitnessSchedule from '../WitnessSchedule';
import WitnessRanking from '../WitnessRanking';

export default () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/portfolio' component={Portfolio} />
    <Route path='/feed' component={Feed} />
    <Route path='/about' component={About} />
    <Route path='/post/:permlink' component={Post} />
    <Route path='/profile' component={Profile} />
    <Route path='/witness-schedule' component={WitnessSchedule} />
    <Route path='/witnesses' component={WitnessRanking} />
    <Route component={FourOhFour} />
  </Switch>
);
