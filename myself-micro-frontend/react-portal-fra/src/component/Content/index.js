import React from "react";
import { Route, HashRouter, Switch, Redirect } from "react-router-dom";
import AppContent from "./AppContent";
// 开始Redux引入
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "@/redux/actions/actions";
// 结束Redux引入
import { Layout, Icon } from "antd";
const { Content, Header } = Layout;

// 连接 React 组件与 Redux store
@connect(
  // 将store中collapsed值赋值到组件中变量collapsed
  state => {
    return {
      collapsed: state.collapsed
    };
  },
  // 将action和dispatch组合起来生成mapDispatchToProps需要生成的内容。
  dispatch => bindActionCreators(actionCreators, dispatch)
)


class Sider extends React.Component {
  render() {
    const { collapsed, toggle } = this.props; // 菜单折叠参数及函数
    const url=JSON.parse(localStorage.getItem('routes'))[0].path.substring(6) // 首个展示地址
    return (
      <Layout>
        {/* 右侧顶部导航栏开始 */}
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
        {/* 右侧顶部导航栏结束 */}

        {/* 右侧底部内容页开始 */}
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
              <Route exact path="/" />
              <Route exact path="/app/:id" component={AppContent} />
              {/* 重定向至菜单导航栏第一个path */}
              <Redirect to={url} /> 
              {/* <Route exact path="/angular" component={Angular} /> */}
              {/* <Route exact path="/vue" component={Vue} /> */}
            </Switch>
          </HashRouter>
          <div>
            {/* 子项目切换不同框架挂载DOM节点 */}
            <div id="single-vue">
              <div id="app"> </div>
            </div>
            {/*
             <div id="react-app"> </div>
             <div id="angular-app"> </div>
            */}
          </div>
        </Content>
        {/* 右侧底部内容页结束 */}
      </Layout>
    );
  }
}

export default Sider;
