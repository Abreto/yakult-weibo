import React from 'react';

import { Query, withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';

import { Alert } from 'react-bootstrap';
import { Skeleton, List } from 'antd';

class UserItemPure extends React.Component {
  render() {
    return (
      <List.Item>
        content
      </List.Item>
    );
  }
}
const UserItem = withApollo(UserItemPure);

const UserListPure = ({ users, refetch }) => (
  <List
    itemLayout="horizontal"
    dataSource={users}
    renderItem={user => <UserItem user={user} refreshList={refetch} />}
  />
);

const GET_ALL_USERS = gql`
  {
    allusers {
      id
      username
      lastPostedAt
    }
  }
`;
const UserList = () => (
  <Query
    query={GET_ALL_USERS}
  >
    {({
      loading,
      error,
      data,
      refetch
    }) => {
      if (loading) return <Skeleton active />;
      if (error) {
        console.log(error);
        return <Alert variant="danger">Failed to load users list</Alert>;
      }

      const { allusers } = data;
      return <UserListPure users={allusers} refetch={refetch} />;
    }}
  </Query>
);

const UserManager = () => (
  <div>
    <h2>Users</h2>
    <UserList />
  </div>
);

export default UserManager;
