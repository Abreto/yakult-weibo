import React from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import { List, Skeleton } from 'antd';
import PostPure from './post-pure';

const ListSkeleton = () => (
  <List.Item>
    <Skeleton active avatar />
  </List.Item>
);

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

function Post({ id, refetch, contentFilter }) {
  return (
    <Query
      query={GET_POST}
      variables={{ id }}
    >
      {({ loading, error, data }) => {
        if (loading) return <ListSkeleton />;
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
        return <PostPure id={id} refetch={refetch} {...post} contentFilter={contentFilter} />;
      }}
    </Query>
  );
}
Post.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Post;
