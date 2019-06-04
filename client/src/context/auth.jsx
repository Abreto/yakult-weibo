import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';

const AuthContext = React.createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

class AuthProviderPure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      login: async (...args) => this.login(...args),
      logout: async () => this.logout(),
    };
  }

  async login(username, password) {
    const { client } = this.props;
    const token = btoa(`${username}:${password}`);
    const header = `Basic ${token}`;

    const { data: { user } } = await client.query({
      query: gql`
        {
          user {
            id
            username
            usertype
          }
        }
      `,
      fetchPolicy: 'network-only',
      context: {
        headers: {
          Authorization: header,
        },
      },
    });

    if (!user) {
      /** failed login */
    } else {
      localStorage.setItem('token', header);
      this.setState({
        user: {
          id: user.id,
          username: user.username,
          usertype: user.usertype,
        }
      });
    }
  }

  async logout() {
    const { client } = this.props;
    localStorage.removeItem('token');
    await client.resetStore();
    this.setState({
      user: null,
    });
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
