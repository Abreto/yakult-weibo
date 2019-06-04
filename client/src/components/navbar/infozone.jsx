import React from 'react';
import PropTypes from 'prop-types';

import { Navbar, Button } from 'react-bootstrap';

const Infozone = ({ username, onSignOut }) => {
  let hide = false;
  if (!username) hide = true;

  return (
    <div hidden={hide}>
      <Navbar.Text className="mr-sm-2">
        Hello,
        {' '}
        {username}
      </Navbar.Text>
      <Button
        size="sm"
        variant="secondary"
        onClick={onSignOut}
      >
        <i className="fas fa-sign-out-alt" />
        {/* Sign out */}
      </Button>
    </div>
  );
};
Infozone.propTypes = {
  username: PropTypes.string.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

export default Infozone;
