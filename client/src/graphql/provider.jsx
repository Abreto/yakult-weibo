import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';

import client from './client';

const ApiProvider = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);
ApiProvider.propTypes = {
  children: PropTypes.object, // eslint-disable-line
};

export default ApiProvider;
