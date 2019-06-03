import React from 'react';
import { Button } from 'react-bootstrap';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import logo from './logo.svg';
import './App.css';

function Welcome() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.js</code>
          {' '}
and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button>Test</Button>
        <Query
          query={gql`
            {
              versionx
            }
          `}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) {
              console.log(error);
              return <p>Error :(</p>;
            }

            console.log(data);
            return <p>Loaded. :)</p>;
          }}
        </Query>
      </header>
    </div>
  );
}

export default Welcome;
