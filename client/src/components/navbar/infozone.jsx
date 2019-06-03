import React from 'react';

import { Navbar } from 'react-bootstrap';

const Infozone = ({ username }) => {
  let hide = false;
  if (!username) hide = true;

  return (
    <div hidden={hide}>
      <Navbar.Text>
        Hello,
        {' '}
        {username}
      </Navbar.Text>
    </div>
  );
};

export default Infozone;
