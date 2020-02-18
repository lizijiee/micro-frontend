import React, { Component } from "react";
import SiderContent from "./component/Sider";
import MainContent from "./component/Content";
import { Layout } from "antd";
import "./App.less";

export default class App extends Component {
  render() {
    return (
      <Layout>
        {/* 左侧内容部分 */}
        <SiderContent />
        {/* 右侧内容部分*/}
        <MainContent />
      </Layout>
    );
  }
}
