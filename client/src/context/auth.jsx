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

async function clearLocalStorage() {
  const itemsToRemove = [
    'lastLogged',
    'lastId',
    'lastUsername',
    'lastUsertype',
  ];
  itemsToRemove.forEach(key => localStorage.removeItem(key));
}

class AuthProviderPure extends React.Component {
  constructor(props) {
    super(props);

    let defaultUser = null;
    if (localStorage.getItem('lastLogged') === 'true') {
      defaultUser = {
        id: localStorage.getItem('lastId'),
        username: localStorage.getItem('lastUsername'),
        usertype: localStorage.getItem('lastUsertype'),
      };
    }
    this.state = {
      user: defaultUser,
      login: async (...args) => this.login(...args),
      logout: async () => this.logout(),
    };

    this.initialize();
  }

  async saveToLocalStorage() {
    const { user } = this.state;
    if (user !== null) {
      const { id, username, usertype } = user;
      localStorage.setItem('lastLogged', 'true');
      localStorage.setItem('lastId', id);
      localStorage.setItem('lastUsername', username);
      localStorage.setItem('lastUsertype', usertype);
    }
  }

  async updateUser(user) {
    this.setState({
      user: {
        id: user.id,
        username: user.username,
        usertype: user.usertype,
      },
    }, () => {
      this.saveToLocalStorage();
    });
  }

  shouldUserUpdate(newUser) {
    const { user } = this.state;
    if (!user) return true;

    const comparsingKeys = ['id', 'username', 'usertype'];
    return comparsingKeys.some(val => (user[val] !== newUser[val]));
  }

  async initialize() {
    const { client } = this.props;
    const { data: { user } } = await client.query({
      query: GET_USER,
    });

    if (user && this.shouldUserUpdate(user)) {
      this.updateUser(user);
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
      this.updateUser(user);
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
    clearLocalStorage();
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
