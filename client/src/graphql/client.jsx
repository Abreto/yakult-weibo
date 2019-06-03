import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: '/api',
  request: (operation) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: headers.Authorization || localStorage.getItem('token') || '',
      },
    }));
  },
});

export default client;
