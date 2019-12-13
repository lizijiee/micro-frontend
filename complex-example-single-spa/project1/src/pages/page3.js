import React from "react";

export default class HomePage extends React.Component {
  render() {
    return (
      <iframe
        src="https://www.baidu.com/s?wd=iframe%E8%8F%9C%E9%B8%9F&rsv_spt=1&rsv_iqid=0xafa9972f000bd098&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_enter=1&rsv_dl=tb&inputT=3762&rsv_t=a14fisnJAvyUzZv8hDcj%2FUW7kjWu%2FX5fUi2Sy%2FFA%2BVGOV6G5i7YLrBTI4pW9TkbzXm6s&rsv_sug3=16&rsv_sug1=18&rsv_sug7=100&oq=iframe&rsv_pq=c3ccc3b900000ba8&rsv_sug2=0&rsv_sug4=4133"
        style={{
          //   width: "100%",
          height: "300px",
          //   border: 0,
          allowtransparency: true,
          allowfullscreen: true
          //   scrolling: "no"
        }}
        width="100%"
        frameBorder="0"
        scrolling="no"
      ></iframe>
    );
  }
}
