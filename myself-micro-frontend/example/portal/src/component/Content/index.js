import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"; // 引入Route
import Loadable from "react-loadable";
import ReactComponent from "./React.jsx";
import Angular from "./Angular.jsx";
import Vue from "./Vue.jsx";
// const ReactComponent = React.lazy(() => import("./React.jsx"));

const LoadableReact = Loadable({
  loader: () => import("./React.jsx"),
  loading: () => <div>Loading!!!!!!!!!!!!!!!!!!!!!!</div>
});
const LoadableVue = Loadable({
  loader: () => import("./Vue.jsx"),
  loading: () => <div>Loading!!!!!!!!!!!!!!!!!!!!!!</div>
});
const LoadableAngular = Loadable({
  loader: () => import("./Angular.jsx"),
  loading: () => <div>Loading!!!!!!!!!!!!!!!!!!!!!!</div>
});

class Sider extends React.Component {
  render() {
    return (
      <Switch>
        <Router>
          <Route exact path="/react" component={LoadableReact} />
          <Route exact path="/angular" component={LoadableAngular} />
          <Route exact path="/vue" component={LoadableVue} />
        </Router>
      </Switch>
    );
  }
}

export default Sider;
