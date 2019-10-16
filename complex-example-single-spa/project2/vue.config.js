const webpack = require('webpack');
const path = require('path');

/* 
    修改webpack的入口文件为我们上面新增的project2.js，设置允许跨域，修改出口文件的名称
*/
module.exports = {
    chainWebpack: config => {
        config.entryPoints.clear()
        config.entry('project2').add('./src/project2.js').end()
        config.output.filename('project2.js').library('project2').libraryTarget('amd').end()
        config.devServer.port(8237).headers({
            "Access-Control-Allow-Origin": "*",
        })
        config.module.rule('images').use('url-loader').loader('url-loader').tap(options => ({
            limit: 4096,
            fallback: {
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]'
                }
            }
        }))
    },
    outputDir: path.resolve(__dirname, 'build/project2')
}