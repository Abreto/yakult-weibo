import React from 'react';
import PropTypes from 'prop-types';
import { List, Skeleton } from 'antd';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import { AuthConsumer } from '../context/auth';
import Post from './post';
import { PostingBtn } from './posting';

const GET_ALL_POSTS = gql`
  query Posts($onlyFollowed: Boolean!){
    posts(onlyFollowed: $onlyFollowed) {
      id
    }
  }
`;
const GET_FAVOURITES_POSTS = gql`
  query {
    user {
      id
      favourites {
        id
      }
    }
  }
`;

const ListHeader = ({ refetch }) => (
  <AuthConsumer>
    {({ user }) => ((!user)
      ? <h2>Posts</h2>
      : <PostingBtn onPost={refetch} />)}
  </AuthConsumer>
);
ListHeader.propTypes = {
  refetch: PropTypes.func.isRequired,
};

export const PostsPureReally = ({ posts, showheader = true, refetch, contentFilter }) => (
  <List
    bordered
    header={showheader ? <ListHeader refetch={refetch} /> : undefined}
    itemLayout="vertical"
    dataSource={posts}
    renderItem={post => (
      <Post
        key={post.id}
        id={post.id}
        refetch={refetch}
        contentFilter={contentFilter}
      />
    )}
  />
);

const postSkeleton = <Skeleton active paragraph={{ rows: 8 }} />;

const PostsPureOnlyFavourites = () => (
  <Query
    query={GET_FAVOURITES_POSTS}
  >
    {({
      loading,
      error,
      data,
      refetch,
    }) => {
      if (loading) return postSkeleton;
      if (error) {
        return (
          <p>
            Failed to load favourites posts.
          </p>
        );
      }

      const { user: { favourites } } = data;
      return (
        <PostsPureReally posts={favourites} refetch={refetch} showheader={false} />
      );
    }}
  </Query>
);

const PostsPureWithoutOnlyFavourites = ({ onlyFollowed }) => (
  <Query
    query={GET_ALL_POSTS}
    variables={{ onlyFollowed }}
  >
    {({
      loading,
      error,
      data,
      refetch,
    }) => {
      if (loading) return postSkeleton;
      if (error) {
        return (
          <p>
            Failed to load posts.
            With
            {' '}
            <code>onlyFollowed</code>
            {'='}
            {onlyFollowed}
          </p>
        );
      }

      const { posts } = data;
      return (
        <PostsPureReally posts={posts} refetch={refetch} />
      );
    }}
  </Query>
);
PostsPure.propTypes = {
  onlyFollowed: PropTypes.bool.isRequired,
};

function PostsPure({ onlyFavourites, onlyFollowed }) {
  if (onlyFavourites) {
    return <PostsPureOnlyFavourites />;
  }

  return <PostsPureWithoutOnlyFavourites onlyFollowed={onlyFollowed} />;
}

class Posts extends React.Component {
  constructor(props) {
    super(props);

    const { onlyFollowed, onlyFavourites } = this.props;
    this.state = {
      onlyFollowed,
      onlyFavourites,
    };
  }

  render() {
    return (
      <div className="mb-2">
        <AuthConsumer>
          {({ user }) => {
            if (!user) return <PostsPure onlyFollowed={false} onlyFavourites={false} />;

            const { onlyFollowed, onlyFavourites } = this.state;
            return <PostsPure onlyFollowed={onlyFollowed} onlyFavourites={onlyFavourites} />;
          }}
        </AuthConsumer>
      </div>
    );
  }
}
Posts.propTypes = {
  onlyFollowed: PropTypes.bool,
};
Posts.defaultProps = {
  onlyFollowed: false,
};

export default Posts;
