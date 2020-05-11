// import * as webpack from 'webpack';
// "deployUrl": "//localhost:4000/",
// console.log(222222)
// export default {
//   output: {
//     // publicPath: 'http://localhost:5000/',
//     library: "singleReact", // 导出名称
//     libraryTarget: "window", //挂载目标
//   },
// }
// as webpack.Configuration;

module.exports = {
  output: {
    publicPath: 'http://localhost:4000/',
    library: "singleAngular", // 导出名称
    libraryTarget: "window", //挂载目标
  },
}
// const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default

// module.exports = (angularWebpackConfig, options) => {
// const singleSpaWebpackConfig = singleSpaAngularWebpack(angularWebpackConfig, options)

// Feel free to modify this webpack config however you'd like to
// return singleSpaWebpackConfig
// }
