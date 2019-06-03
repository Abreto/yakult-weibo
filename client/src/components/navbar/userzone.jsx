import React from 'react';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import { Text } from 'react-bootstrap/Navbar';

import Loginzone from './loginzone';
import Infozone from './infozone';

function NavUserzone() {
  return (
    <Query
      query={gql`{ user { username } }`}
      fetchPolicy="network-only"
    >
      {({
        loading,
        error,
        data,
        refetch,
      }) => {
        const myRefetch = () => refetch();

        if (loading) return <Text>Loading..</Text>;
        if (error) {
          console.log(error);
          return <Loginzone refetch={myRefetch} />;
        }

        if (!data.user) return <Loginzone refetch={myRefetch} />;
        return <Infozone username={data.user.username} refetch={myRefetch} />;
      }}
    </Query>
  );
}

export default NavUserzone;
