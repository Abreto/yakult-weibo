import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

import { Navbar, Nav } from 'react-bootstrap';
import { Brand } from 'react-bootstrap/Navbar';

import NavUserzone from './userzone';
import { AuthConsumer } from '../../context/auth';

function Navlink({ to, children }) {
  return (
    <NavLink to={to} className="nav-link" activeClassName="active">
      {children}
    </NavLink>
  );
}
Navlink.propTypes = {
  to: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};

const NavPersonalHome = () => (
  <AuthConsumer>
    {({ user }) => ((!user) ? null : (<Navlink to="/home">Personal Home</Navlink>))}
  </AuthConsumer>
);

const NavAdminPanel = () => (
  <AuthConsumer>
    {({ user }) => {
      if (!user) return null;
      const { usertype } = user;
      if (usertype !== 'ADMIN') return null;
      return <Navlink to="/admin">Admin Panel</Navlink>;
    }}
  </AuthConsumer>
);

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
          <NavPersonalHome />
          <NavAdminPanel />
        </Nav>

        <NavUserzone />
      </Navbar.Collapse>
    </Navbar>
  );
}
export default Navigator;
