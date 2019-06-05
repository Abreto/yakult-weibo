import React from 'react';
// import PropTypes from 'prop-types';

import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';

import { Tooltip, message } from 'antd';

import { AuthConsumer } from '../../../context/auth';

const FORWARD = gql`
  mutation Forward($id: String!) {
    forward(id: $id)
  }
`;

class ForwardActionLayerPure extends React.Component {
  async retweet() {
    const { id, refetch, client } = this.props;

    const { data: { forward } } = await client.mutate({
      mutation: FORWARD,
      variables: { id },
    });

    if (!forward) {
      message.error('Failed to retweet if :(');
    } else {
      refetch();
    }
  }

  render() {
    const { children } = this.props;
    return (
      <span onClick={async () => this.retweet()}>
        {children}
      </span>
    );
  }
}
const ForwardActionLayer = withApollo(ForwardActionLayerPure);

const RetweetIcon = (
  <Tooltip title="Forward">
    <i className="fas fa-retweet" />
  </Tooltip>
);

export default function Forward({ id, refetch }) {
  return (
    <AuthConsumer>
      {({ user }) => {
        if (!user) {
          return (
            <span
              onClick={() => message.error('Please sign in first')}
            >
              {RetweetIcon}
            </span>
          );
        }

        return (
          <ForwardActionLayer id={id} refetch={refetch}>
            {RetweetIcon}
          </ForwardActionLayer>
        );
      }}
    </AuthConsumer>
  );
}
