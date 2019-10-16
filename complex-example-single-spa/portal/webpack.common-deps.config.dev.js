/* eslint-env node */
const config = require('./webpack.common-deps.config.js'); // 这个插件的作用是在热加载时直接返回更新文件名，而不是文件的id。
const webpack = require('webpack');

config.plugins.push(new webpack.NamedModulesPlugin());
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.devServer = {
  headers: {
    // 上面配置dev-server跨域，很重要！！！否则会因为无法跨域，访问不到js文件
    "Access-Control-Allow-Origin": "*",
  },
}

config.mode = 'development'

module.exports = config;