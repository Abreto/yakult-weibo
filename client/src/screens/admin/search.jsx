/* eslint-disable react/no-multi-comp */
import React from 'react';
import _ from 'lodash';

import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';

import {
  Container,
  Row,
  Col,
  Form,
} from 'react-bootstrap';
import {
  List,
  Spin,
} from 'antd';

import { PostsPureReally as Posts } from '../../components/posts';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.triggerSearch = _.debounce(() => this.triggerSearchRaw(), 512);

    this.state = {
      contain: '',
    };
  }

  triggerSearchRaw() {
    const { triggerSearch } = this.props;
    const { contain } = this.state;
    triggerSearch(contain);
  }

  update(contain) {
    this.setState({
      contain,
    }, () => this.triggerSearch());
  }

  render() {
    const { contain } = this.state;

    return (
      <Form>
        <Form.Group as={Row}>
          <Form.Label column xs="auto">
            Keywords
          </Form.Label>
          <Col xs>
            <Form.Control
              type="text"
              placeholder="balabala ..."
              value={contain}
              onChange={e => this.update(e.target.value)}
            />
          </Col>
        </Form.Group>
      </Form>
    );
  }
}

const SEARCH = gql`
  query Search($contain: String!) {
    search(contain: $contain) {
      id
    }
  }
`;

const SearchResult = ({ searched, result, refetch, contentFilter }) => {
  if (!searched) {
    return (<List bordered dataSource={[]} />);
  }
  return (
    <Posts
      posts={result}
      showheader={false}
      refetch={refetch}
      contentFilter={contentFilter}
    />
  );
};

class SearchModulePure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searched: false,
      searching: false,
      contain: '',
      result: [],
      contentFilter: i => i,
    };
  }

  triggerSearch(contain) {
    this.setState({
      searching: true,
      contain,
    }, () => this.handleSearch());
  }

  async handleSearch() {
    const { client } = this.props;
    const { contain } = this.state;

    const { data: { search } } = await client.query({
      query: SEARCH,
      variables: { contain },
      fetchPolicy: "no-cache",
    });

    this.setState({
      result: search,
    }, () => this.postSearch());
  }

  postSearch() {
    const { contain } = this.state;
    const regexp = new RegExp(`(${contain.trim().replace(' ', '|')})`, 'iug');
    this.setState({
      searching: false,
      searched: true,
      contentFilter: (content) => {
        const emph = ({ children }) => (<b style={{ color: 'red' }}>{children}</b>);
        const children = [];
        let lastIdx = 0;

        content.replace(regexp, (str, p1, idx, whole) => {
          if (idx > lastIdx) {
            children.push(<span>{whole.substr(lastIdx, idx - lastIdx)}</span>);
          }
          children.push(React.createElement(emph, null, whole.substr(idx, str.length)));
          lastIdx = idx + str.length;
        });

        if (lastIdx < content.length) {
          children.push(<span>{content.substr(lastIdx, content.length - lastIdx)}</span>);
        }

        return React.createElement('span', null, ...children);
      },
    });
  }

  render() {
    const {
      searched,
      searching,
      result,
      contentFilter,
    } = this.state;
    return (
      <>
        <Row>
          <Col>
            <SearchInput as={Col} triggerSearch={(contain) => this.triggerSearch(contain)} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Spin spinning={searching}>
              <SearchResult
                searched={searched}
                result={result}
                refetch={() => this.handleSearch()}
                contentFilter={contentFilter}
              />
            </Spin>
          </Col>
        </Row>
      </>
    );
  }
}
const SearchModule = withApollo(SearchModulePure);

const SearchPanel = () => (
  <div>
    <h2>Search</h2>
    <Container>
      <SearchModule />
    </Container>
  </div>
);

export default SearchPanel;
