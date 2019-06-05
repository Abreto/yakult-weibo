/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { List, Tooltip } from 'antd';

import BindActions from './actions';
import Avatar from '../avatar';
import Username from '../username';
import RepliesPanel from './replieszone';

class PostPure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repliesPanelVisible: false,
      refreshReplyIcon: () => {},
    };
  }

  setRefreshReplyIcon(refreshReplyIcon) {
    this.setState({
      refreshReplyIcon,
    });
  }

  toggleRepliesPanel() {
    this.setState((state) => {
      const { repliesPanelVisible } = state;
      return {
        repliesPanelVisible: !repliesPanelVisible,
      };
    });
  }

  render() {
    const {
      id, poster, createdAt, content, originator, refetch,
    } = this.props;
    const {
      repliesPanelVisible,
      refreshReplyIcon,
    } = this.state;

    const titleComponent = (
      <Username id={poster.id} username={poster.username} />
    );

    return (
      <List.Item
        key={id}
        actions={BindActions(id, refetch, {
          toggleRepliesPanel: () => this.toggleRepliesPanel(),
          setRefreshReplyIcon: f => this.setRefreshReplyIcon(f),
        })}
      >
        <List.Item.Meta
          avatar={<Avatar id={poster.id} />}
          title={titleComponent}
          description={(
            <>
              <Tooltip title={moment(parseInt(createdAt, 10)).format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment(parseInt(createdAt, 10)).fromNow()}</span>
              </Tooltip>
              {originator ? (
                <span>
                  {' ('}
                  forwarded from
                  {' '}
                  <Username id={originator.id} username={originator.username} />
                  {')'}
                </span>
              ) : null}
            </>
          )}
        />
        <div>{content}</div>
        <RepliesPanel
          id={id}
          show={repliesPanelVisible}
          refreshReplyIcon={refreshReplyIcon}
        />
      </List.Item>
    );
  }
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
