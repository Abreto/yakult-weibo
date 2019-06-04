import React from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

// import { Card } from 'react-bootstrap';
import { Comment, Tooltip, Spin, Card } from 'antd';
import moment from 'moment';

import Avatar from '../avatar';

function PostPure({ poster, createdAt, content, children }) {
  return (
    <Comment
      // actions={[<span>Forward</span>, <span>Reply to</span>]}
      // actions={[<span className="mr-sm-2"><i className="fas fa-heart" /></span>, <span className="mr-sm-2"><i className="fas fa-retweet" /></span>, <span><i className="far fa-comment-dots" /></span>]}
      actions={[<span className="mr-sm-2"><i className="far fa-heart" /></span>, <span className="mr-sm-2"><i className="fas fa-retweet" /></span>, <span><i className="far fa-comment-dots" /></span>]}
      author={<span>{poster.username}</span>}
      avatar={<Avatar id={poster.id} />}
      datetime={(
        <Tooltip title={moment(parseInt(createdAt)).format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment(parseInt(createdAt)).fromNow()}</span>
        </Tooltip>
      )}
      content={<p>{content}</p>}
    >
      {children}
    </Comment>
  );
}

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

function Post({ id }) {
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
        return <PostPure {...post} />;
      }}
    </Query>
  );
}
Post.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Post;
