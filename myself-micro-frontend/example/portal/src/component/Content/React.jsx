import React from "react";
//  异步加载组件;
export default class ReactComponent extends React.Component {
  componentWillUnmount() {
    // 卸载异步操作设置状态
    console.log("React组件已经被卸载啦");
    clearTimeout(this.timeouter);
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    return <div id="react-app" />;
  }
}
