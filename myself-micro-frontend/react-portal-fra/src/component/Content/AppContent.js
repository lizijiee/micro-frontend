import React from "react";
// 开始Redux引入
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "@/redux/actions/actions.js";
// 结束Redux引入

// 连接 React 组件与 Redux store
@connect(
  // 将store中routes值赋值到组件中变量routes
  state => {
    return {
      routes: state.routes
    };
  },
  // 将action和dispatch组合起来生成mapDispatchToProps需要生成的内容。
  dispatch => bindActionCreators(actionCreators, dispatch)
)
class AppContent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      path,
      params: {
        id
      }
    } = this.props.match; // 路由参数（应用索引）
    const index = parseInt(id);
    if (isNaN(index)) {
      // 作页面查找不到404处理
    } else {
      // 跳转页面
      this.props.requestRoutes(index, path).then(url => {
        window.location.href = `http://localhost:3000${url}`;
      });
    }
  }

  render() {
    return null;
  }
}

export default AppContent;