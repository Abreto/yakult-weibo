import React from 'react';

import { AuthConsumer } from '../../context/auth';
import Loginzone from './loginzone';
import Infozone from './infozone';

function NavUserzone() {
  return (
    <AuthConsumer>
      {({ user, login, logout }) => ((!user)
        ? <Loginzone onSignIn={login} />
        : <Infozone username={user.username} onSignOut={logout} />)}
    </AuthConsumer>
  );
}

export default NavUserzone;
