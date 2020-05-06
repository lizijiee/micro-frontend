import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import { HashRouter as Router, Link, Switch, Route, useParams } from 'react-router-dom'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import './App.less';

const { Header, Sider, Content } = Layout;
function App() {
  const [collapsed, setCollapse] = useState(false)
  return (
    <div className="App" >
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <ul >
            <li key="react" >
              <Link to="/react">React</Link>
            </li>
            <li key="vue" >
              <Link to="/vue">Vue</Link>
            </li>
            <li key="angular" >
              <Link to="/angular">Angular</Link>
            </li>
          </ul>
          <Switch>
            <Route path="/:id" children={<Child />} />
          </Switch>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => { setCollapse(!collapsed) },
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}

export default App;