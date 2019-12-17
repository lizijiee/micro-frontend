# 微前端 —— portal项目

## portal项目介绍 

> portal项目包括两个功能：
>
> 1.路由分发与应用加载；
> 2.抽离公共依赖；

注册 singleSpa.registerApplication（参数详情）

启动 singleSpa.start()

> [vue-single-spa](https://gitee.com/Janlaywss/vue-single-spa)

## portal项目启动

>  yarn 安装node_modules
>
> yarn start 启动项目

## 公共依赖抽离

> [lerna](https://github.com/lerna/lerna)

```javascript
 externals: [
    /^@portal\/*/,
    /^lodash$/,
    /^single-spa$/,
    /^rxjs\/?.*$/,
    /^react$/,
    /.*react-dom.*/,
  ],
```

