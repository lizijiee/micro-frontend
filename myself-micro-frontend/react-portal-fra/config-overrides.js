const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias,
    addDecoratorsLegacy
} = require('customize-cra');

module.exports = override(
    // 支持装饰器@
    addDecoratorsLegacy(),
    addWebpackAlias({
        // 设置别名路径  
        ["@"]: require('path').resolve(__dirname, "src"),
    }),
    // antd按需加载，避免每个页面引入"antd/dist/antd.css"
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    // 支持less
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#1890ff'
        },
    }),
);