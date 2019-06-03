import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Welcome from './screens/welcome/index';
import WeiboLayout from './screens/weibo-layout';

const Layout = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route component={WeiboLayout} />
    </Switch>
  </Router>
);

export default Layout;
