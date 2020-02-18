import React from "react";
// 引入Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "@/redux/actions/actions.js";

// 引入redux
@connect(
  // 将store中collapsed值赋值到组件中变量collapsed
  state => {
    return {
      routes: state.routes
    };
  },
  dispatch => bindActionCreators(actionCreators, dispatch)
)
class NoMatch extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { id } = this.props.match.params; //路由参数
    const index = Number(id);
    if (isNaN(index)) {
      // 作页面查找不到404处理
    } else {
      this.props.requestRoutes(index).then(url => {
        window.location.href = `http://localhost:3000${url}`;
      });
    }
  }
  render() {
    // 如果不存在app
    return null;
  }
}

export default NoMatch;
