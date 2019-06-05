import React from 'react';
// import PropTypes from 'prop-types';

import { Tooltip, Spin } from 'antd';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const replytoIconPure = (<i className="far fa-comment-dots" />);
const TooltipLayer = ({ children }) => (
  <Tooltip title="Reply to">
    {children}
  </Tooltip>
);
const ReplyToIcon = ({ num }) => (
  <TooltipLayer>
    {replytoIconPure}
    {' '}
    {num}
  </TooltipLayer>
);

const GET_REPLIES = gql`
  query Replies($to: String!) {
    replies(to: $to) {
      id
      poster {
        id
        username
      }
      content
      createdAt
    }
  }
`;

class RefetchSetter extends React.Component {
  componentDidMount() {
    const {
      setRefreshReplyIcon,
      refetch,
    } = this.props;
    console.log(refetch);
    setRefreshReplyIcon(refetch);
  }

  render() {
    return <span />;
  }
}

class ReplyTo extends React.Component {
  render() {
    const {
      id,
      toggleRepliesPanel,
      setRefreshReplyIcon,
    } = this.props;
    return (
      <Query
        query={GET_REPLIES}
        variables={{ to: id }}
        fetchPolicy="no-cache"
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return <Spin />;
          if (error) return null;

          const { replies } = data;
          return (
            <span onClick={toggleRepliesPanel}>
              <ReplyToIcon num={replies.length} />
              <RefetchSetter
                setRefreshReplyIcon={setRefreshReplyIcon}
                refetch={refetch}
              />
            </span>
          );
        }}
      </Query>
    );
  }
}

export default ReplyTo;
