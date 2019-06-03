import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import { Mutation } from 'react-apollo';
// import { gql } from 'apollo-boost';

import logo from '../logo.svg';
import './welcome.css';

// let x = 0;

function Welcome() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Welcome to
          {' '}
          <code>Yakult Weibo</code>
        </h1>
        <Link to="/explore">
          <Button size="lg">Explore !</Button>
        </Link>
        {/* <Mutation
          mutation={gql`
            mutation {
              config(key: "x", value: "y")
            }
          `}
        >
          {(mul, res) => {
            if (x === 0) mul();
            x += 1;
            console.log(mul, x, res);
            if (res.error) {
              return (
                <p>
                  Error:
                  {' '}
                  {res.error.message}
                </p>
              );
            }
            return (
              <p>
                Loaded
                {x}
              </p>
            );
          }}
        </Mutation> */}
      </header>
    </div>
  );
}

export default Welcome;
