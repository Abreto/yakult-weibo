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

import SettingsPanel from './settings';
import UserManagerPanel from './usermanager';
import SearchPanel from './search';

const RealAdminPanel = () => (
  <Tab.Container id="admin-panel-tabs" defaultActiveKey="#admin-tabs-search">
    <Row>
      <Col sm={9}>
        <Tab.Content>
          <Tab.Pane eventKey="#admin-tabs-settings">
            <SettingsPanel />
          </Tab.Pane>
          <Tab.Pane eventKey="#admin-tabs-users">
            <UserManagerPanel />
          </Tab.Pane>
          <Tab.Pane eventKey="#admin-tabs-search">
            <SearchPanel />
          </Tab.Pane>
        </Tab.Content>
      </Col>
      <Col sm={3}>
        <div>
          <Affix offsetTop={64}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="#admin-tabs-settings">Settings</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#admin-tabs-users">Users Management</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#admin-tabs-search">Search</Nav.Link>
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
