import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Navbar, Nav } from 'react-bootstrap';
import { Brand } from 'react-bootstrap/Navbar';

import NavUserzone from './userzone';

function Navlink({ to, children }) {
  return (
    <>
      {/* <NavLink to={to} activeClassName="active" className="nav-link">
        <Nav.Link href={to}>
          {children}
        </Nav.Link>
      </NavLink> */}
      <NavLink to={to} className="nav-link" activeClassName="active">
        {children}
      </NavLink>
    </>
  );
}

function Navigator() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      sticky="top"
    >
      <Link to="/explore"><Brand>Yakult Weibo</Brand></Link>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Navlink to="/explore">Explore</Navlink>
          <Navlink to="/home">Personal Home</Navlink>
          <Navlink to="/admin">Admin Panel</Navlink>
        </Nav>

        <NavUserzone />
      </Navbar.Collapse>
    </Navbar>
  );
}
export default Navigator;
