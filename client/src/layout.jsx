import React from 'react';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Welcome from './screens/welcome';
import Weibo from './screens/weibo';

const Layout = () => (
  <Router>
    <Route exact path="/" component={Welcome} />
    <Route component={Weibo} />
  </Router>
);

export default Layout;
