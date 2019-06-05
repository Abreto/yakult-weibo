import React from 'react';
import PropTypes from 'prop-types';
import { Spin, List } from 'antd';

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

const PostsPure = ({ onlyFollowed }) => (
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
      if (loading) return <Spin />;
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
        <List
          bordered
          header={<ListHeader refetch={refetch} />}
          itemLayout="vertical"
          dataSource={posts}
          renderItem={post => <Post key={post.id} id={post.id} refetch={refetch} />}
        />
      );
    }}
  </Query>
);
PostsPure.propTypes = {
  onlyFollowed: PropTypes.bool.isRequired,
};

class Posts extends React.Component {
  constructor(props) {
    super(props);

    const { onlyFollowed } = this.props;
    this.state = {
      onlyFollowed,
    };
  }

  render() {
    return (
      <AuthConsumer>
        {({ user }) => {
          if (!user) return <PostsPure onlyFollowed={false} />;

          const { onlyFollowed } = this.state;
          return <PostsPure onlyFollowed={onlyFollowed} />;
        }}
      </AuthConsumer>
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
