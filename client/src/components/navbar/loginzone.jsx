import React from 'react';

import {
  Form,
  InputGroup,
  Button,
} from 'react-bootstrap';

import RegisterModal from '../register-modal';

class NavLoginzone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      registerModalShow: false,
    };
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
    const { registerModalShow } = this.state;

    return (
      <>
        <Form inline>
          <InputGroup className=" mr-sm-2">
            <Form.Control type="text" size="sm" placeholder="Username" />
            <Form.Control type="password" size="sm" placeholder="Password" />
          </InputGroup>
          <Button size="sm" variant="primary" className="mr-sm-2">Login</Button>
          <Button
            size="sm"
            variant="success"
            className="mr-sm-2"
            onClick={() => this.showRegisterModal()}
          >
            Register
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

export default NavLoginzone;
