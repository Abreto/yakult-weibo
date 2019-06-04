import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import { message } from 'antd';

import Navigator from '../components/navbar/index';
import NoticeAlert from '../components/notice-alert';

import './weibo-layout.css';
import Posts from '../components/posts';

message.config({
  top: 60,
});

function Home() {
  return <h1>Home</h1>;
}

function Profile() {
  return <h1>Profile</h1>;
}

function Default() {
  return (
    <>
      {/* <h2>Posts</h2> */}
      <Posts />
    </>
  );
}

const WeiboLayout = () => (
  <>
    <Navigator />
    <Container>
      <NoticeAlert />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route component={Default} />
      </Switch>
    </Container>
  </>
);

export default WeiboLayout;
