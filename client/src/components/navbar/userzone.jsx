import React from 'react';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import { Text } from 'react-bootstrap/Navbar';

import Loginzone from './loginzone';
import Infozone from './infozone';

function NavUserzone() {
  return (
    <Query query={gql`{ user { username } }`}>
      {({
        loading,
        error,
        data,
        refetch,
      }) => {
        if (loading) return <Text>Loading..</Text>;
        if (error) return <Loginzone refetch={refetch} />;

        if (!data.user) return <Loginzone refetch={refetch} />;
        return <Infozone username={data.user.username} refetch={refetch} />;
      }}
    </Query>
  );
}

export default NavUserzone;
