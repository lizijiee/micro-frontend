import React from "react";
import { Route, HashRouter, Switch, Redirect } from "react-router-dom"; // 引入Route
import Loadable from "react-loadable";
import ReactComponent from "./React.jsx";
import Angular from "./Angular.jsx";
import Vue from "./Vue.jsx";
import NoMatch from "./NoMatch.jsx";
// 引入Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "@/redux/actions/actions.js";

import { Layout, Menu, Icon } from "antd";
const { Content, Header } = Layout;

// 引入redux
@connect(
  // 将store中collapsed值赋值到组件中变量collapsed
  state => {
    return {
      collapsed: state.collapsed
    };
  },
  dispatch => bindActionCreators(actionCreators, dispatch)
)
class Sider extends React.Component {
  render() {
    const { collapsed, toggle } = this.props;
    return (
      <Layout>
        {/* 右侧顶部导航栏 */}
        <Header
          style={{
            background: "#fff",
            padding: 0
          }}
        >
          <Icon
            className="trigger"
            type={collapsed ? "menu-unfold" : "menu-fold"}
            onClick={() => toggle(collapsed)}
          />
        </Header>
        {/* 右侧底部内容页 */}
        <Content
          style={{
            // margin: "15px 15px",
            padding: 15,
            background: "#161616",
            minHeight: 280
          }}
        >
          <HashRouter>
            <Switch>
              {/* <Route exact path="/" component={NoMatch} /> */}
              <Route exact path="/"></Route>
              <Route exact path="/app/:id" component={NoMatch} />
              {/* <Route exact path="/react" component={ReactComponent} /> */}
              {/* <Route exact path="/angular" component={Angular} /> */}
              {/* <Route exact path="/vue" component={Vue} /> */}
              {/* <Route path="*" component={NoMatch} /> */} <Redirect to="/" />
            </Switch>
          </HashRouter>
          <div>
            <div id="angular-app"> </div>
            <div id="single-vue">
              <div id="app"> </div>
            </div>
            <div id="react-app"> </div>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Sider;
