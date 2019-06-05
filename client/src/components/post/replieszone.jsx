import React from 'react';
import moment from 'moment';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import { Button, Alert } from 'react-bootstrap';
import {
  Divider,
  List,
  Tooltip,
  Spin,
} from 'antd';

import Username from '../username';
import Avatar from '../avatar';

class ReplyToForm extends React.Component {
  render() {
    return (
      <Button>Reply</Button>
    );
  }
}

const ReplyItem = ({ poster, content, createdAt }) => (
  <List.Item>
    <List.Item.Meta
      style={{ maxWidth: 160 }}
      avatar={<Avatar id={poster.id} />}
      title={<Username id={poster.id} username={poster.username} />}
      description={(
        <Tooltip title={moment(parseInt(createdAt, 10)).format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment(parseInt(createdAt, 10)).fromNow()}</span>
        </Tooltip>
      )}
    >
    </List.Item.Meta>
    <div>
      {content}
    </div>
  </List.Item>
);

const RepliesPanelPure = ({
  show = true,
  dataSource,
  refetch,
  repliesIconRefresh,
}) => (
  <div hidden={!show}>
    <Divider orientation="left">Replies</Divider>
    <List
      itemLayout="horizontal"
      header={<ReplyToForm postReplied={refetch} />}
      dataSource={dataSource}
      renderItem={reply => <ReplyItem key={reply.id} {...reply} />}
    />
  </div>
);

const GET_REPLIES = gql`
  query Replies($to: String!) {
    replies(to: $to) {
      id
      poster {
        id
        username
      }
      content
      createdAt
    }
  }
`;
const RepliesPanel = ({ id }) => (
  <Query
    query={GET_REPLIES}
    variables={{ to: id }}
    fetchPolicy="no-cache"
  >
    {({ loading, error, data }) => {
      if (loading) return <Spin />;
      if (error) return <Alert variant="danger">Failed to load replies.</Alert>;

      const { replies } = data;
      return <RepliesPanelPure dataSource={replies} />;
    }}
  </Query>
);

export default RepliesPanel;
