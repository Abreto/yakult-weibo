import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import Navigator from '../components/navbar/index';

import './weibo.css';

function Home() {
  return <h1>Home</h1>;
}

function Profile() {
  return <h1>Profile</h1>;
}

function Default() {
  return (
    <>
      <h2>Default</h2>
    </>
  );
}

const Weibo = () => (
  <>
    <Navigator />
    <Container>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route component={Default} />
      </Switch>
    </Container>
  </>
);

export default Weibo;
