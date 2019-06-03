import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Button, Form } from 'react-bootstrap';

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

  onRegister() {
    console.log(this.state);
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
          <Button className="mr-sm-2" onClick={() => this.onRegister()}>Register</Button>
          <Button variant="secondary" onClick={() => this.onHide()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
RegisterModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default RegisterModal;
