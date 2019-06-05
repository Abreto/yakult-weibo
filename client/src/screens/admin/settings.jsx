import React from 'react';

import { Form, Input } from 'antd';
import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';

class ConfigNoticeItemPure extends React.Component {
  constructor(props) {
    super(props);

    this.configKey = 'notice';
    this.helpMessages = {
      validating: 'Saving...',
      success: 'Saved.',
      error: 'An error occurred during saving :(',
    };
    this.state = {
      content: '',
      hasFeedback: false,
      validateStatus: '',
      help: '',
    };
  }

  async componentWillMount() {
    const { client } = this.props;
    const { data: { config } } = await client.query({
      query: gql`
        query Config($key: String!) {
          config(key: $key)
        }
      `,
      variables: { key: 'notice' },
      fetchPolicy: 'no-cache',
    });

    this.setState({
      content: config,
    });
  }

  async save(val) {
    this.setState({
      hasFeedback: true,
      validateStatus: 'validating',
      help: this.helpMessages.validating,
    });

    const { client } = this.props;
    const { content } = this.state;
    const { data: { config } } = await client.mutate({
      mutation: gql`
        mutation SetConfig($key: String!, $value: String) {
          config(key: $key, value: $value)
        }
      `,
      variables: { key: 'notice', value: content },
    });

    if (config) {
      this.setState({
        validateStatus: 'success',
        help: this.helpMessages.success,
      });
    } else {
      this.setState({
        validateStatus: 'error',
        help: this.helpMessages.error,
      });
    }
  }

  render() {
    const {
      hasFeedback,
      validateStatus,
      help,
      content,
    } = this.state;

    return (
      <Form.Item
        label="Public Notice"
        hasFeedback={hasFeedback}
        validateStatus={validateStatus}
        help={help}
      >
        <Input.TextArea
          value={content}
          rows={4}
          autosize={{
            minRows: 3,
            maxRows: 8,
          }}
          onChange={e => this.setState({
            content: e.target.value,
          })}
          onBlur={() => this.save()}
        />
      </Form.Item>
    );
  }
}
const ConfigNoticeItem = withApollo(ConfigNoticeItemPure);

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const SettingsForm = () => (
  <Form {...formItemLayout}>
    <ConfigNoticeItem />
  </Form>
);

const SettingsPanel = () => (
  <>
    <h2>Settings</h2>
    <SettingsForm />
  </>
);

export default SettingsPanel;
