import React from 'react';
import { ApolloProvider } from 'react-apollo';

import client from './client';

const ApiProvider = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);

export default ApiProvider;
