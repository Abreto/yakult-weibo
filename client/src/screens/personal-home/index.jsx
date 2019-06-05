import React from 'react';
import { Redirect } from 'react-router-dom';

import {
  Row,
  Col,
  Nav,
  Tab,
} from 'react-bootstrap';
import { Affix } from 'antd';

import Posts from '../../components/posts';
import { AuthConsumer } from '../../context/auth';

const RealHome = () => (
  <Tab.Container id="personal-home-tabs" defaultActiveKey="#personal-home-tabs-followed">
    <Row>
      <Col sm={9}>
        <Tab.Content>
          <Tab.Pane eventKey="#personal-home-tabs-followed">
            <Posts onlyFollowed />
          </Tab.Pane>
          <Tab.Pane eventKey="#personal-home-tabs-favourites">
            <Posts onlyFavourites />
          </Tab.Pane>
        </Tab.Content>
      </Col>
      <Col sm={3}>
        <div>
          <Affix offsetTop="64">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="#personal-home-tabs-followed">Followed</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#personal-home-tabs-favourites">Favourites</Nav.Link>
              </Nav.Item>
            </Nav>
          </Affix>
        </div>
      </Col>
    </Row>
  </Tab.Container>
);

const Home = () => (
  <AuthConsumer>
    {({ user }) => {
      if (!user) {
        return <Redirect to="/explore" />;
      }

      return <RealHome />;
    }}
  </AuthConsumer>
);

export default Home;
