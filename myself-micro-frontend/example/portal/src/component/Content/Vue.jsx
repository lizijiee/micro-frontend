import React from "react";

class Vue extends React.Component {
  componentWillUnmount() {
    // 卸载异步操作设置状态
    console.log("Vue组件已经被卸载啦");
    clearTimeout(this.timeouter);
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    return (
      <div id="single-vue">
        <div id="vue" />
      </div>
    );
  }
}

export default Vue;
