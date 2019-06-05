/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';

import { Query, withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';

import { Tooltip, message } from 'antd';

import { AuthConsumer } from '../../../context/auth';

const DO_LIKE = gql`
  mutation Like($id: String!) {
    star(id: $id)
  }
`;
const UNDO_LIKE = gql`
  mutation Dislike($id: String!) {
    unstar(id: $id)
  }
`;
class FavouriteActionLayerPure extends React.Component {
  async like() {
    /** do something about like */
    const { client, id, refetch } = this.props;
    const { data: { star } } = await client.mutate({
      mutation: DO_LIKE,
      variables: { id },
    });

    if (!star) {
      message.error('Failed to favourite it. Good luck next time!');
    } else {
      refetch();
    }
  }

  async dislike() {
    /** do something about dislike */
    const { client, id, refetch } = this.props;
    const { data: { unstar } } = await client.mutate({
      mutation: UNDO_LIKE,
      variables: { id },
    });

    if (!unstar) {
      message.error('Failed to favourite it. Good luck next time!');
    } else {
      refetch();
    }
  }

  render() {
    const { type, children } = this.props;
    const action = type ? (async () => this.dislike()) : (async () => this.like());

    return (
      <span onClick={action}>
        {children}
      </span>
    );
  }
}
FavouriteActionLayerPure.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.bool.isRequired, // true for faved, false for unfaved
  refetch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
};
const FavouriteActionLayer = withApollo(FavouriteActionLayerPure);

const unfaved = (
  <Tooltip title="Favourite">
    <i className="far fa-heart" />
  </Tooltip>
);
const faved = (
  <Tooltip title="Unfavourite">
    <i className="fas fa-heart" />
  </Tooltip>
);

const GET_FAV_STATUS = gql`
  query FavStatus($id: String!) {
    isStarring(id: $id)
  }
`;
class FavouritePure extends React.Component {
  render() {
    const { id } = this.props;

    return (
      <Query
        query={GET_FAV_STATUS}
        variables={{ id }}
        fetchPolicy="no-cache"
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return unfaved;
          if (error) return unfaved;

          const { isStarring } = data;
          const innerComponent = isStarring ? faved : unfaved;
          return (
            <FavouriteActionLayer id={id} type={isStarring} refetch={refetch}>
              {innerComponent}
            </FavouriteActionLayer>
          );
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
        if (!user) {
          return (
            <span
              onClick={() => message.error('Please sign in first!')}
            >
              {unfaved}
            </span>
          );
        }
        return <FavouritePure id={id} />;
      }}
    </AuthConsumer>
  );
}
