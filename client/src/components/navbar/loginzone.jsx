import React from 'react';
import PropTypes from 'prop-types';

import {
  InputGroup,
  Button,
} from 'react-bootstrap';

import RegisterModal from '../register-modal';

class NavLoginzone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      registerModalShow: false,
      username: '',
      password: '',
    };
  }

  async handleSignIn() {
    const { onSignIn } = this.props;
    const { username, password } = this.state;
    await onSignIn(username, password);
  }

  showRegisterModal() {
    this.setState({
      registerModalShow: true,
    });
  }

  closeRegisterModal() {
    this.setState({
      registerModalShow: false,
    });
  }


  render() {
    const { registerModalShow, username, password } = this.state;

    return (
      <>
        <Form inline>
          <InputGroup className="mr-sm-2">
            <Form.Control
              type="text"
              size="sm"
              placeholder="Username"
              value={username}
              onChange={e => this.setState({
                username: e.target.value,
              })}
            />
            <Form.Control
              type="password"
              size="sm"
              placeholder="Password"
              value={password}
              onChange={e => this.setState({
                password: e.target.value,
              })}
            />
          </InputGroup>
          <Button
            size="sm"
            variant="primary"
            className="mr-sm-2"
            onClick={async () => this.handleSignIn()}
          >
            Sign in
          </Button>
          <Button
            size="sm"
            variant="success"
            className="mr-sm-2"
            onClick={() => this.showRegisterModal()}
          >
            Sign up
          </Button>
        </Form>
        <RegisterModal
          show={registerModalShow}
          onHide={() => this.closeRegisterModal()}
        />
      </>
    );
  }
}
NavLoginzone.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};

export default NavLoginzone;
