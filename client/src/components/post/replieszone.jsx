import React from 'react';
import moment from 'moment';

import { Query, withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';

import {
  Button,
  Alert,
  Form,
  Col,
} from 'react-bootstrap';
import {
  Divider,
  List,
  Tooltip,
  Spin,
  message,
} from 'antd';

import Username from '../username';
import Avatar from '../avatar';

const REPLY_ACTION = gql`
  mutation Reply($to: String!, $content: String!) {
    reply(to: $to, content: $content)
  }
`;
class ReplyToFormPure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
    };
  }

  async reply() {
    if (!this.validate()) {
      message.error('和谐世界, 文明发言');
      return;
    }

    const { client } = this.props;
  }

  validate() {
    const { content } = this.state;

    if ((typeof content) !== 'string') return false;
    if (content === '') return false;

    return true;
  }

  render() {
    return (
      <Form>
        <Form.Row>
          <Form.Group as={Col} xs>
            <Form.Control
              as="input"
              placeholder="Your comment here"
            />
          </Form.Group>
          <Form.Group as={Col} xs="1">
            <Button>Reply</Button>
          </Form.Group>
        </Form.Row>
      </Form>
    );
  }
}
const ReplyToForm = withApollo(ReplyToFormPure);

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
  id,
  show = true,
  dataSource,
  refetch,
  repliesIconRefresh,
}) => (
  <div hidden={!show}>
    <Divider orientation="left">Replies</Divider>
    <List
      itemLayout="horizontal"
      header={<ReplyToForm id={id} postReplied={refetch} />}
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
const RepliesPanel = ({ id, show }) => (
  <Query
    query={GET_REPLIES}
    variables={{ to: id }}
    fetchPolicy="no-cache"
  >
    {({ loading, error, data }) => {
      if (loading) return <Spin />;
      if (error) return <Alert show={show} variant="danger">Failed to load replies.</Alert>;

      const { replies } = data;
      return <RepliesPanelPure id={id} show={show} dataSource={replies} />;
    }}
  </Query>
);

export default RepliesPanel;
