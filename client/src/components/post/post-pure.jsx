import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Comment, Tooltip } from 'antd';

import Avatar from '../avatar';

function PostPure({
  poster, createdAt, content, children
}) {
  return (
    <Comment
      // actions={[<span>Forward</span>, <span>Reply to</span>]}
      // actions={[<span className="mr-sm-2"><i className="fas fa-heart" /></span>, <span className="mr-sm-2"><i className="fas fa-retweet" /></span>, <span><i className="far fa-comment-dots" /></span>]}
      actions={[<span className="mr-sm-2"><i className="far fa-heart" /></span>, <span className="mr-sm-2"><i className="fas fa-retweet" /></span>, <span><i className="far fa-comment-dots" /></span>]}
      author={<span>{poster.username}</span>}
      avatar={<Avatar id={poster.id} />}
      datetime={(
        <Tooltip title={moment(parseInt(createdAt, 10)).format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment(parseInt(createdAt, 10)).fromNow()}</span>
        </Tooltip>
      )}
      content={<p>{content}</p>}
    >
      {children}
    </Comment>
  );
}
PostPure.propTypes = {
  poster: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  children: PropTypes.object,
};
PostPure.defaultProps = {
  children: null,
};

export default PostPure;
