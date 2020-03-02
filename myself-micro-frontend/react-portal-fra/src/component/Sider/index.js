import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
// 开始Redux引入
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "@/redux/actions/actions.js";
// 结束Redux引入

import { Layout, Menu, Icon } from "antd";
const { Sider } = Layout;
// 连接 React 组件与 Redux store
@connect(
  // 将store中collapsed/routes值赋值到组件中变量collapsed/routes
  state => {
    return {
      collapsed: state.collapsed,
      routes: state.routes
    };
  },
  // 将action和dispatch组合起来生成mapDispatchToProps需要生成的内容。
  dispatch => bindActionCreators(actionCreators, dispatch)
)

class LeftSider extends React.Component {
  constructor(){
    super()
    this.state = {
      data: [], // 菜单树数据
      id:[]   // 菜单默认选中项id
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const data = JSON.parse(localStorage.getItem("routes")); // 浏览器缓存菜单树数据
    const { routes } = nextProps; 
    // 当传入的data发生变化的时候，更新state
    if (routes !== prevState.data) {
      return {
        data: !!data ? data : routes,
        id: !!data ? [`${data[0].id}`] : [],
      };
    }
    // 对于state不进行任何操作
    return null;
  }


  render() {
    const { collapsed } = this.props;// 左侧导航栏折叠状态
    return (
      <Router>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            onClick={this.handleClick}
            defaultSelectedKeys={this.state.id}
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
