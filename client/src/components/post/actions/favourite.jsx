import React from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import { message } from 'antd';

import { AuthConsumer } from '../../../context/auth';

class FavouriteActionLayer extends React.Component {
  async like() {
    /** do something about like */
  }

  async dislike() {
    /** do something about dislike */
  }

  render() {
    return null;
  }
}
FavouriteActionLayer.propTypes = {
  id: PropTypes.string.isRequired,
  dir: PropTypes.bool.isRequired, // true for fav, false for unfav
  children: PropTypes.object.isRequired,
};

const unfaved = (<i className="far fa-heart" />);
const faved = (<i className="fas fa-heart" />);

const GET_FAV_STATUS = gql`
  {
    user {
      favourites { id }
    }
  }
`;
class FavouritePure extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Query
        query={GET_FAV_STATUS}
        fetchPolicy="no-cache"
      >
        {({ loading, error, data }) => {
          if (loading) return unfaved;
          if (error) return unfaved;

          console.log(data);
          return unfaved;
        }}
      </Query>
    );
  }
}
FavouritePure.propTypes = {
  id: PropTypes.string.isRequired,
};

export default function Favourite({ id }) {
  return (
    <AuthConsumer>
      {({ user }) => {
        if (!user) return (
          <span onClick={() => message.error('Please sign in first!')}>
            {unfaved}
          </span>
        );
        return <FavouritePure id={id} />;
      }}
    </AuthConsumer>
  );
};
