import React from 'react';
import { Redirect } from 'react-router-dom';

import {
  Tab,
  Row,
  Col,
  Nav,
} from 'react-bootstrap';
import {
  Affix,
} from 'antd';

import { AuthConsumer } from '../../context/auth';

const RealAdminPanel = () => (
  <Tab.Container id="personal-home-tabs" defaultActiveKey="#admin-tabs-settings">
    <Row>
      <Col sm={9}>
        <Tab.Content>
          <Tab.Pane eventKey="#admin-tabs-settings">
            <p>settings</p>
          </Tab.Pane>
          <Tab.Pane eventKey="#admin-tabs-users">
            <p>users</p>
          </Tab.Pane>
        </Tab.Content>
      </Col>
      <Col sm={3}>
        <div>
          <Affix offsetTop="64">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="#admin-tabs-settings">Settings</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#admin-tabs-users">Users Management</Nav.Link>
              </Nav.Item>
            </Nav>
          </Affix>
        </div>
      </Col>
    </Row>
  </Tab.Container>
);

const AdminPanel = () => (
  <AuthConsumer>
    {({ user }) => {
      if (!user || user.usertype !== 'ADMIN') {
        return <Redirect to="/explore" />;
      }

      return <RealAdminPanel />;
    }}
  </AuthConsumer>
);

export default AdminPanel;
