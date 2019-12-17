import React from "react";

class Angular extends React.Component {
  componentWillUnmount() {
    // 卸载异步操作设置状态
    console.log("Angular组件已经被卸载啦");
    clearTimeout(this.timeouter);
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    return <div id="angular-app" />;
  }
}

export default Angular;
