const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/common-deps.js',
  output: {
    filename: 'common-deps.js',
    path: path.resolve(__dirname, 'build/common-deps'),
    chunkFilename: '[name].js',
  },
  mode: 'production', // 提供 mode 配置选项，告知 webpack 使用相应模式的内置优化。
  node: {
    fs: 'empty',
  },
  resolve: {
    modules: [
      __dirname,
      'node_modules',
    ],
  },
  devtool: 'sourcemap',
  plugins: [
    new CleanWebpackPlugin(['build/common-deps/']),
    CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/common-deps.js')
    }]),
  ],
  module: {
    rules: [{
        parser: {
          System: false
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
}