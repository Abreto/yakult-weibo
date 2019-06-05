import React from 'react';

import { Query, withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';

import {
  Button,
} from 'react-bootstrap';
import {
  Popover,
  Spin,
  Tooltip,
  message,
} from 'antd';

import { AuthConsumer } from '../context/auth';

const PopoverItem = ({ titleStr, content, show }) => (
  <Popover
    title={titleStr}
    content={content}
  >
    {show}
  </Popover>
);

const FOLLOW_ACTION = gql`
  mutation Follow($id: String!) {
    follow(id: $id)
  }
`;
const UNFOLLOW_ACTION = gql`
  mutation Unfollow($id: String!) {
    unfollow(id: $id)
  }
`;
class FollowButtonPure extends React.Component {
  async follow() {
    const { id, refetch, client } = this.props;

    const { data: { follow } } = await client.mutate({
      mutation: FOLLOW_ACTION,
      variables: { id },
    });

    if (follow) {
      message.success('Successfully followed him(her)');
      refetch();
    }
  }

  async unfollow() {
    const { id, refetch, client } = this.props;

    const { data: { unfollow } } = await client.mutate({
      mutation: UNFOLLOW_ACTION,
      variables: { id },
    });

    if (unfollow) {
      message.success('Successfully unfollowed him(her)');
      refetch();
    }
  }

  render() {
    const { isFollowing } = this.props;

    if (isFollowing) {
      return (
        <Button variant="warning" onClick={() => this.unfollow()}>Click me to unfollow him(her)</Button>
      );
    }

    return <Button variant="success" onClick={() => this.follow()}>Click me to follow him(her)</Button>;
  }
}
const FollowButton = withApollo(FollowButtonPure);

const GET_FOLLOW_STATUS = gql`
  query FollowStatus($id: String!) {
    isFollowing(id: $id)
  }
`;
const FollowLayerWhenSignedIn = ({ id, show }) =>(
  <Query
    query={GET_FOLLOW_STATUS}
    variables={{ id }}
    fetchPolicy="no-cache"
  >
    {({ loading, data, refetch }) => {
      if (loading) return <Spin />;

      const { isFollowing } = data;
      const titleString = `${isFollowing ? 'Disl' : 'L'}ike him(her) ${isFollowing ? 'now' : ''}?`;
      return (
        <PopoverItem
          titleStr={titleString}
          content={<FollowButton id={id} isFollowing={isFollowing} refetch={refetch} />}
          show={show}
        />
      );
    }}
  </Query>
);

const FollowLayer = ({ id, children }) => (
  <AuthConsumer>
    {({ user }) => {
      if (!user) {
        return (
          <PopoverItem
            titleStr="Like him(her)?"
            content={(
              <Tooltip title="Sign in to follow users">
                <Button variant="success" disabled>
                  Click me to follow him(her)
                </Button>
              </Tooltip>
            )}
            show={children}
          />
        );
      }

      return <FollowLayerWhenSignedIn id={id} show={children} />
    }}
  </AuthConsumer>
);

const UsernamePure = ({ id, username }) => (
  <FollowLayer id={id}>
    <span>
      {username}
    </span>
  </FollowLayer>
);

const GET_USER = gql`
  query User($id: String!) {
    user(id: $id) {
      username
    }
  }
`;
const Username = ({ id, username }) => {
  if (!username) {
    return (
      <Query
        query={GET_USER}
        variables={{ id }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Spin />;
          if (error) return <span>Aho</span>;

          const gotUsername = data.username;
          return <UsernamePure id={id} username={gotUsername} />;
        }}
      </Query>
    );
  }

  return <UsernamePure id={id} username={username} />;
};

export default Username;
