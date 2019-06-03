import React from 'react';

import { Switch, Route } from 'react-router-dom';

function Home() {
  return <h1>Home</h1>;
}

function Profile() {
  return <h1>Profile</h1>;
}

function Default() {
  return <h2>Default</h2>;
}

const Weibo = () => (
  <div>
    <h1>Weibo Framwork</h1>
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route component={Default} />
    </Switch>
  </div>
);

export default Weibo;
