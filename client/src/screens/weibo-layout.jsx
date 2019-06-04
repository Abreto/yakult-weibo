import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';
// import { Toast } from 'react-bootstrap';
import Navigator from '../components/navbar/index';
import NoticeAlert from '../components/notice-alert';

import './weibo-layout.css';
import Post from '../components/post/index';

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
      <Post />
    </>
  );
}

// const TToas = () => (
//   <div
//   aria-live="polite"
//   aria-atomic="true"
//   style={{
//     position: 'relative',
//     minHeight: '100px',
//     position: 'absolute',
//     top: '60px',
//     right: '10px',
//   }}
// >
//   <Toast>
//     <Toast.Header>
//       <strong className="mr-auto">Bootstrap</strong>
//     </Toast.Header>
//     <Toast.Body>See? Just like this. xxxxxxx</Toast.Body>
//   </Toast>
// </div>
// );

const WeiboLayout = () => (
  <>
    <Navigator />
    {/* <TToas /> */}
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
