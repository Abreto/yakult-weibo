import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';

import { message } from 'antd';

const AuthContext = React.createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

const GET_USER = gql`
  {
    user {
      id
      username
      usertype
    }
  }
`;

class AuthProviderPure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      login: async (...args) => this.login(...args),
      logout: async () => this.logout(),
    };

    this.initialize();
  }

  async updateUser(user) {
    await this.setState({
      user: {
        id: user.id,
        username: user.username,
        usertype: user.usertype,
      }
    });
  }

  async initialize() {
    const { client } = this.props;
    const { data: { user } } = await client.query({
      query: GET_USER,
    });

    if (user) {
      await this.updateUser(user);
    }
  }

  async login(username, password) {
    const { client } = this.props;
    const token = btoa(`${username}:${password}`);
    const header = `Basic ${token}`;

    const { data: { user } } = await client.query({
      query: GET_USER,
      fetchPolicy: 'network-only',
      context: {
        headers: {
          Authorization: header,
        },
      },
    });

    if (!user) {
      /** failed login */
      message.error('Failed to sign in: Invalid login');
    } else {
      localStorage.setItem('token', header);
      await this.updateUser(user);
      message.success('Signed in!');
    }
  }

  async logout() {
    const { client } = this.props;
    localStorage.removeItem('token');
    client.resetStore();
    this.setState({
      user: null,
    });
    message.success('Signed out!');
  }

  render() {
    const { children } = this.props;
    return (
      <AuthContext.Provider value={this.state}>
        {children}
      </AuthContext.Provider>
    );
  }
}
AuthProviderPure.propTypes = {
  children: PropTypes.object.isRequired, // eslint-disable-line
  client: PropTypes.object.isRequired, // eslint-disable-line
};

export const AuthProvider = withApollo(AuthProviderPure);
export const AuthConsumer = AuthContext.Consumer;
