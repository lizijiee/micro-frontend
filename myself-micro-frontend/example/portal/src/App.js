import React, { Component } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import "./App.less";
import Sider from "./component/Sider";
import Content from "./component/Content";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Sider />
          <Content />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
