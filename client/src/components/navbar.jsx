import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Navbar, Nav } from 'react-bootstrap';
import { Brand } from 'react-bootstrap/Navbar';

function Navlink({ to, children }) {
  return (
    <>
      <NavLink to={to} activeClassName="active">
        <Nav.Link href={to}>
          {children}
        </Nav.Link>
      </NavLink>
    </>
  );
}

function Navigator() {
  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      fixed="top"
    >
      <Link to="/explore"><Brand>Yakult Weibo</Brand></Link>

      <Nav className="mr-auto">
        <Navlink to="/home">Home</Navlink>
        <Navlink to="/admin">Admin Panel</Navlink>
      </Nav>
    </Navbar>
  );
}
export default Navigator;
