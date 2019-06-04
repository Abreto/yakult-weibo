import React from 'react';
import PropTypes from 'prop-types';

import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';

import { Modal, Button, Form } from 'react-bootstrap';
import { message } from 'antd';

import { AuthConsumer } from '../context/auth';

const RegisterForm = ({ onUsernameChange, onPasswordChange }) => (
  <Form>
    <Form.Group controlId="regFormUsername">
      <Form.Label>Username</Form.Label>
      <Form.Control type="text" placeholder="Enter username" onChange={onUsernameChange} />
      <Form.Text className="text-muted">
        What would you like for us to call you?
      </Form.Text>
    </Form.Group>

    <Form.Group controlId="regFormPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password here" onChange={onPasswordChange} />
    </Form.Group>
  </Form>
);
RegisterForm.propTypes = {
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
};

const REGISTER = gql`
  mutation Register($form: UserRegisterForm) {
    register(form: $form) { id }
  }
`;

class RegisterModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  onHide() {
    const { onHide } = this.props;

    this.setState({
      username: '',
      password: '',
    });

    onHide();
  }

  async onRegister(onSuccess) {
    if (!this.validateForm()) {
      message.error('Please input valid username and password');
      return;
    }
    
    const { client } = this.props;
    const { username, password } = this.state;
    const { data: { register } } = await client.mutate({
      mutation: REGISTER,
      variables: {
        form: {
          username,
          password,
        },
      },
    });

    if (!register) {
      message.error('Failed to sign up :(');
      return;
    }

    await onSuccess(username, password);
  }

  validateForm() {
    const { username, password } = this.state;
    if ((typeof username) !== 'string') return false;
    if ((typeof password) !== 'string') return false;
    if (username === '') return false;
    if (password === '') return false;
    return true;
  }

  render() {
    const { show } = this.props;

    return (
      <Modal
        show={show}
        onHide={() => this.onHide()}
        // size="lg"
        aria-labelledby="contained-modal-title-register"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-register">
            Register
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <RegisterForm
            onUsernameChange={({ target: { value } }) => this.setState({
              username: value,
            })}
            onPasswordChange={({ target: { value } }) => this.setState({
              password: value,
            })}
          />
        </Modal.Body>

        <Modal.Footer>
          <AuthConsumer>
            {({ login }) => (
              <Button
                className="mr-sm-2"
                onClick={async () => this.onRegister(login)}>
                Register
              </Button>
            )}
          </AuthConsumer>
          <Button variant="secondary" onClick={() => this.onHide()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
RegisterModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
};

export default withApollo(RegisterModal);
