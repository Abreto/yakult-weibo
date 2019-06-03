import React from 'react';

import { Navbar, Button } from 'react-bootstrap';

import { withApollo } from 'react-apollo';

const Infozone = ({ username, refetch, client }) => {
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
        variant="primary"
        onClick={async () => {
          localStorage.removeItem('token');
          await client.resetStore();
          refetch();
        }}
      >
        Sign out
      </Button>
    </div>
  );
};

export default withApollo(Infozone);
