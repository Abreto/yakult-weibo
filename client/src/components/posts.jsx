import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import { AuthConsumer } from '../context/auth';
import Post from './post';

const GET_ALL_POSTS = gql`
  query Posts($onlyFollowed: Boolean!){
    posts(onlyFollowed: $onlyFollowed) {
      id
      poster {
        id
        username
      }
      originator {
        id username
      }
      content
      createdAt
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
      if (error) return <p>Failed to load posts.</p>;

      console.log(data);
      return data.posts.map(post => <Post {...post} />);
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
