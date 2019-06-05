/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { List, Tooltip } from 'antd';

import BindActions from './actions';
import Avatar from '../avatar';
import RepliesPanel from './replieszone';

function PostPure({
  id, poster, createdAt, content, originator, refetch,
}) {
  return (
    <List.Item
      key={id}
      actions={BindActions(id, refetch)}
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
      <div>{content}</div>
      <RepliesPanel id={id} />
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
