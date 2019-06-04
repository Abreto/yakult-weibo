import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { List, Tooltip } from 'antd';

import BindActions from './actions';
import Avatar from '../avatar';

function PostPure({
  id, poster, createdAt, content, originator
}) {
  return (
    <List.Item
      key={id}
      actions={BindActions(id)}
      extra={originator ? `from ${originator.username}` : null}
    >
      <List.Item.Meta
        avatar={<Avatar id={poster.id} />}
        title={<span>{poster.username}</span>}
        description={(
          <Tooltip title={moment(parseInt(createdAt, 10)).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment(parseInt(createdAt, 10)).fromNow()}</span>
          </Tooltip>
        )}
      />
      <p>{content}</p>
      {/* <Comment
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
      </Comment> */}
    </List.Item>
  );
}
PostPure.propTypes = {
  id: PropTypes.string.isRequired,
  poster: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
// PostPure.defaultProps = {
//   children: null,
// };

export default PostPure;
