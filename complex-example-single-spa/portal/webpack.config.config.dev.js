const config = require('./webpack.config.config.js')
const webpack = require('webpack')

// 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
// HMR 即模块热替换(hot module replacement)简称。
config.plugins.push(new webpack.NamedModulesPlugin());
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.devServer = {
  contentBase: './build',
  historyApiFallback: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  proxy: {
    "/common/": {
      target: "http://localhost:8234",
      pathRewrite: {
        "^/common": ""
      }
    }
  }
}

config.mode = 'development'

module.exports = config;