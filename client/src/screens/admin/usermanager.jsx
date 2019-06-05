import React from 'react';

import { Query, withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';

import { Alert } from 'react-bootstrap';
import {
  Skeleton,
  List,
  Popconfirm,
  message,
  Button,
} from 'antd';

import Avatar from '../../components/avatar';
import Username from '../../components/username';
import FromNow from '../../components/fromnow';

const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    removeUser(id: $id)
  }
`;
class DeleteUserActionPure extends React.Component {
  async confirmDelete() {
    const { id, refreshList, client } = this.props;

    const { data: { removeUser } } = await client.mutate({
      mutation: DELETE_USER,
      variables: { id },
    });

    if (removeUser) {
      message.success('Successfully remove user');
      refreshList();
    } else {
      message.error('Deletion failed :(');
    }
  }

  render() {
    return (
      <Popconfirm
        title="Are you sure to delete this user?"
        onConfirm={() => this.confirmDelete()}
        okText="Yes"
        cancelText="No"
      >
        <Button type="danger">Delete</Button>
      </Popconfirm>
    );
  }
}
const DeleteUserAction = withApollo(DeleteUserActionPure);

const UserItem = ({ user, refreshList }) => {
  const { id, lastPostedAt } = user;

  const lastPostedTime = lastPostedAt
    ? <FromNow timestampStr={lastPostedAt} /> : <span>Never</span>;

  return (
    <List.Item actions={[<DeleteUserAction id={id} refreshList={refreshList} />]}>
      <List.Item.Meta
        avatar={<Avatar user={user} />}
        title={<Username user={user} />}
        description={(
          <span>
            Last post:
            {' '}
            {lastPostedTime}
          </span>
        )}
      />
    </List.Item>
  );
};

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
