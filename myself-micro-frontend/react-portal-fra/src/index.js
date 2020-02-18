import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom"; // 将HashRouter赋给Router
import "./single-spa-config.js"; // 引入微前端配置文件;
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// 引入redux
import { Provider } from "react-redux";
import store from "@/redux/store.js";

// store 作为一个prop传给Provider组件
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("base")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
