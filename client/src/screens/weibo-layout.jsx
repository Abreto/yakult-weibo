import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import { Layout, message } from 'antd';

import Navigator from '../components/navbar/index';
import NoticeAlert from '../components/notice-alert';

import './weibo-layout.css';
import Posts from '../components/posts';

import Home from './personal-home';
import Admin from './admin';

message.config({
  top: 60,
});

function Profile() {
  return <h1>Profile</h1>;
}

function Default() {
  return <Posts />;
}

const { Content, Footer } = Layout;
const WeiboLayout = () => (
  <>
    <Navigator />
    <Container>
      <NoticeAlert />
      <Layout style={{ backgroundColor: 'white' }}>
        <Content>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/admin" component={Admin} />
            <Route component={Default} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: 'white' }}>
          Copyleft &copy; 2019 Yakult YANG
        </Footer>
      </Layout>
    </Container>
  </>
);

export default WeiboLayout;
