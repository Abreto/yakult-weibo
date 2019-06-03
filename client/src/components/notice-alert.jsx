import React from 'react';
import { Alert } from 'react-bootstrap';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

class NoticeAlertPure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  render() {
    const handleDismiss = () => this.setState({ show: false });

    const { show } = this.state;
    const { children } = this.props;

    if (show === false) {
      return null;
    }

    return (
      <Alert variant="info" onClose={handleDismiss} dismissible>
        <Alert.Heading>Public Notice</Alert.Heading>
        {children}
      </Alert>
    );
  }
}

function NoticeAlert() {
  return (
    <NoticeAlertPure>
      <Query
        query={gql`{ config(key: "notice") }`}
      >
        {({ error, data }) => {
          if (error) {
            console.error(error);
            return null;
          }

          return <p>{data.config}</p>;
        }}
      </Query>
    </NoticeAlertPure>
  );
}

export default NoticeAlert;
