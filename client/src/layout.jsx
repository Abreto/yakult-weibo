import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import Welcome from './screens/welcome';

const Layout = () => (
  <Router>
    <Route exact path="/" component={Welcome} />
  </Router>
);

export default Layout;
