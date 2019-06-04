import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Spin, List } from 'antd';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import { AuthConsumer } from '../context/auth';
import Post from './post';

const GET_ALL_POSTS = gql`
  query Posts($onlyFollowed: Boolean!){
    posts(onlyFollowed: $onlyFollowed) {
      id
    }
  }
`;

const PostsPure = ({ onlyFollowed }) => (
  <Query
    query={GET_ALL_POSTS}
    variables={{ onlyFollowed }}
  >
    {({ loading, error, data }) => {
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
          header={<Button>Whats Happening?</Button>}
          itemLayout="vertical"
          dataSource={posts}
          renderItem={post => <Post id={post.id} />}
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
