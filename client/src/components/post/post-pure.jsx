import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Comment, Tooltip } from 'antd';

import BindActions from './actions';
import Avatar from '../avatar';

function PostPure({
  id, poster, createdAt, content, children
}) {
  return (
    <Comment
      actions={BindActions(id)}
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
  id: PropTypes.string.isRequired,
  poster: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  children: PropTypes.object,
};
PostPure.defaultProps = {
  children: null,
};

export default PostPure;
