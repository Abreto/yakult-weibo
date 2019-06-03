import React from 'react';

import {
  Form,
  InputGroup,
  Button,
} from 'react-bootstrap';

function NavLoginzone() {
  return (
    <Form inline>
      <InputGroup className=" mr-sm-2">
        <Form.Control type="text" size="sm" placeholder="Username" />
        <Form.Control type="password" size="sm" placeholder="Password" />
      </InputGroup>
      <Button size="sm" variant="primary" className="mr-sm-2">Login</Button>
      <Button size="sm" variant="success" className="mr-sm-2">Register</Button>
    </Form>
  );
}

export default NavLoginzone;
