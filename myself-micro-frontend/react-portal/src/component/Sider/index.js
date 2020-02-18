import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
// 引入Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "@/redux/actions/actions.js";

import { Layout, Menu, Icon } from "antd";
const { Sider } = Layout;

// 引入redux
@connect(
  // 将store中collapsed值赋值到组件中变量collapsed
  state => {
    return {
      collapsed: state.collapsed,
      routes: state.routes
    };
  },
  dispatch => bindActionCreators(actionCreators, dispatch)
)
class LeftSider extends React.Component {
  state = {
    data: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const data = JSON.parse(localStorage.getItem("routes"));
    const { routes } = nextProps;
    // 当传入的routes发生变化的时候，更新state
    if (routes !== prevState.data) {
      return {
        data: !!data ? data : routes
      };
    }
    // 对于state不进行任何操作
    return null;
  }

  render() {
    const { collapsed } = this.props;
    return (
      <Router>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            onClick={this.handleClick}
            defaultSelectedKeys={[`${this.state.data[0].id}`]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
          >
            {this.state.data.map(item => {
              return (
                <Menu.Item key={item.id}>
                  <Link to={item.path}>
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                  </Link>
                </Menu.Item>
              );
            })}
            {/* 
          其它框架路由部分
          <Menu.Item key="11">
              <Link to="/react#/">
                <Icon type="user" />
                <span> React </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="13">
              <Link to="/angular#/">
                <Icon type="user" />
                <span> Angular </span>
              </Link>
            </Menu.Item> 
            */}
          </Menu>
        </Sider>
      </Router>
    );
  }
}

export default LeftSider;
