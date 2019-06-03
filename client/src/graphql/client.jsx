import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: '/api',
  headers: {
    Authorization: localStorage.getItem('token') || '',
  },
});

export default client;
