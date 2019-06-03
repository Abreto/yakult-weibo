import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar } from 'react-bootstrap';
import { Brand } from 'react-bootstrap/Navbar';

function Navigator() {
  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      fixed="top"
    >
      <Link to="/explore"><Brand>Yakult Weibo</Brand></Link>
    </Navbar>
  );
}
export default Navigator;
