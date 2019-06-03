import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import logo from './logo.png';
import bg from './bg.png';
import './welcome.css';

const bgStyle = {
  backgroundImage: `url(${bg})`,
  // backgroundSize: '100%',
  backgroundPosition: 'center',
};

function Welcome() {
  return (
    <div className="App">
      <header className="App-header" style={bgStyle}>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Welcome to Yakult Weibo
        </h1>
        <Link to="/explore">
          <Button size="lg">Explore !</Button>
        </Link>
      </header>
    </div>
  );
}

export default Welcome;
