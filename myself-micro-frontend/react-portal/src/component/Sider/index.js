import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { Menu, Icon } from "antd";
const { SubMenu } = Menu;

class Sider extends React.Component {
  handleClick = e => {
    console.log("click ", e);
  };

  render() {
    return (
      <Router>
        <Menu
          onClick={this.handleClick}
          style={{
            width: 256
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span> Menu </span>{" "}
              </span>
            }
          >
            <Menu.Item key="1">
              <Link to="/react#/"> React </Link>{" "}
            </Menu.Item>{" "}
            <Menu.Item key="2">
              <Link to="/vue#/"> Vue </Link>{" "}
            </Menu.Item>{" "}
            <Menu.Item key="3">
              <Link to="/angular#/"> Angular </Link>{" "}
            </Menu.Item>{" "}
          </SubMenu>{" "}
        </Menu>{" "}
      </Router>
    );
  }
}

export default Sider;
