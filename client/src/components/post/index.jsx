import React from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import { Spin } from 'antd';
import PostPure from './post-pure';

const GET_POST = gql`
  query Post($id: String!) {
    post(id: $id) {
      poster { id username }
      originator { id username }
      content
      createdAt
    }
  }
`;

function Post({ id, refetch }) {
  return (
    <Query
      query={GET_POST}
      variables={{ id }}
    >
      {({ loading, error, data }) => {
        if (loading) return <Spin />;
        if (error) {
          return (
            <p>
              Failed to load post
              {' '}
              {id}
            </p>
          );
        }

        const { post } = data;
        return <PostPure id={id} refetch={refetch} {...post} />;
      }}
    </Query>
  );
}
Post.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Post;
