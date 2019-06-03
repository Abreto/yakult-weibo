import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Welcome from './screens/welcome';
import Weibo from './screens/weibo';

const Layout = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route component={Weibo} />
    </Switch>
  </Router>
);

export default Layout;
