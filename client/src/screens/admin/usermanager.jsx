import React from 'react';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const GET_ALL_USERS = gql`
  {
    allusers {
      id
      username
      lastPostedAt
    }
  }
`;
const UserManager = () => (
  <Query
    query={GET_ALL_USERS}
  >
    {({ loading, error, data, refetch }) => {
      console.log(data);
      return <p>Xs</p>;
    }}
  </Query>
);

export default UserManager;
