/* eslint-disable react/no-multi-comp */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Modal,
  Form,
  Col,
} from 'react-bootstrap';
import { message } from 'antd';

import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';

import { AuthConsumer } from '../context/auth';
import Avatar from './avatar';

const POSTING = gql`
  mutation Posting($content: String!) {
    post(content: $content)
  }
`;

class PostingModalPure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
    };
  }

  async onPost() {
    if (!this.validate()) {
      message.error('Please tell me something.');
      return;
    }

    const { onHide, postPost, client } = this.props;
    const { content } = this.state;
    const { data: { post } } = await client.mutate({
      mutation: POSTING,
      variables: { content },
    });

    if (!post) {
      message.error('Soooory, fail to post new tweet.');
    } else {
      this.setState({
        content: '',
      });
      postPost();
      onHide();
    }
  }

  validate() {
    const { content } = this.state;
    if ((typeof content) !== 'string') return false;
    if (content === '') return false;
    return true;
  }

  render() {
    const { show, onHide } = this.props;
    const { content } = this.state;

    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-posting"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-posting">
            Posting
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col} xs="1">
                <AuthConsumer>
                  {({ user: { id } }) => (<Avatar id={id} />)}
                </AuthConsumer>
              </Form.Group>

              <Form.Group as={Col} xs>
                <Form.Control
                  as="textarea"
                  rows="5"
                  placeholder="What's happening?"
                  value={content}
                  onChange={e => this.setState({
                    content: e.target.value,
                  })}
                />
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={async () => this.onPost()}>Post !</Button>
          <Button
            variant="secondary"
            onClick={onHide}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
PostingModalPure.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  postPost: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
};

export const PostingModal = withApollo(PostingModalPure);

export class PostingBtn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postingModalShow: false,
    };
  }

  showPostingForm() {
    this.setState({
      postingModalShow: true,
    });
  }

  closePostingForm() {
    this.setState({
      postingModalShow: false,
    });
  }

  render() {
    const { postingModalShow } = this.state;
    const { onPost } = this.props;

    return (
      <>
        <Button
          variant="outline-primary"
          size="lg"
          block
          onClick={() => this.showPostingForm()}
        >
          What&#39;s happening?
        </Button>
        <PostingModal
          show={postingModalShow}
          onHide={() => this.closePostingForm()}
          postPost={onPost}
        />
      </>
    );
  }
}
PostingBtn.propTypes = {
  onPost: PropTypes.func,
};
PostingBtn.defaultProps = {
  onPost: () => {},
};
