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

import { AuthConsumer } from '../../context/auth';
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

    const { client, id, postReply } = this.props;
    const { content } = this.state;
    const { data: { reply } } = await client.mutate({
      mutation: REPLY_ACTION,
      variables: {
        to: id,
        content,
      },
    });

    if (!reply) {
      message.error('Sooory, fail to reply it.');
    } else {
      postReply();
      this.setState({
        content: '',
      });
    }
  }

  validate() {
    const { content } = this.state;

    if ((typeof content) !== 'string') return false;
    if (content === '') return false;

    return true;
  }

  render() {
    const { content } = this.state;
    return (
      <Form>
        <Form.Row>
          <Form.Group as={Col} xs>
            <Form.Control
              as="input"
              placeholder="Your comment here"
              value={content}
              onChange={e => this.setState({
                content: e.target.value,
              })}
            />
          </Form.Group>
          <Form.Group as={Col} xs="1">
            <AuthConsumer>
              {({ user }) => ((!user)
                ? (<Button onClick={() => message.error('Please sign in first')}>Reply</Button>)
                : (<Button onClick={() => this.reply()}>Reply</Button>))}
            </AuthConsumer>
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
      header={<ReplyToForm id={id} postReply={refetch} />}
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
    {({
      loading,
      error,
      data,
      refetch,
    }) => {
      if (loading) return <Spin />;
      if (error) return <Alert show={show} variant="danger">Failed to load replies.</Alert>;

      const { replies } = data;
      return (
        <RepliesPanelPure
          id={id}
          show={show}
          dataSource={replies}
          refetch={refetch}
        />
      );
    }}
  </Query>
);

export default RepliesPanel;
