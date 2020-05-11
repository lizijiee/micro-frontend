# 微前端落地指南

## 0. 关于

最近一段时间，由于未来工作中涉及工业应用较多，并且考虑以后需要将工业应用在同一系统进行展示，希望有一个突破口可以解决这个问题，即在一个总项目中展示不同的工业应用，每个工业应用是一个单独的项目，由于工业应用可能由于不同团队进行开发，应用开发技术栈最好没有限制，单一前端框架可能不再能满足要求，由此了解到微前端并进行尝试研究，希望借助微前端可以解决工业应用汇总展示的问题。

当然微前端的实现方式不有很多种，包括iframe、single-spa等，本文采用的主要是single-spa。如果你使用过iframe就会知道，iframe和single-spa完全不是一个难度，如果把iframe比作是easy模式，那么single-spa便是地狱模式，如果你的项目着急上线使用微前端最快的方法就是iframe，，相信也有很多人在想搞一下微前端的同学们，猝死在了研究single-spa的路上，还有也是资料的缺少，因为现在网上虽然微前端文章很多，但是大多只是理论介绍和部分代码的展示，并没法帮助我们真正落地在项目中去实施。

single-spa使用的主要难点在于：
1.对于总项目，如何完美兼容各个子项目，做到技术栈无关，并且让用户感觉是一个整体项目。
2.对于各个子项目，如何减少代码侵入，并且使其具有<font color="red">独立开发、独立运行、独立部署</font>的能力。



## Contents

- [引言](#preface)

- [微前端是什么](#what)

- [参考文章](#title9)

- [参考代码](#title10)

  

## <a id="what"><font color="black">1. 微前端是什么</font></a>

微前端是借鉴后端微服务的概念而来，[single-spa官网](https://single-spa.js.org/)解释到，A microfrontend is a microservice that exists within a browser即微前端是浏览器中存在的微服务，微前端也是UI的一部分，通常由数十个组件组成，而这些组件可以是React，Vue和Angular等不同框架实现的，每个微前端项目可以交由不同的团队进行管理，每个团队也可以选择自己的框架。尽管在迁移或实验时可能会添有其它框架，但是最好对所有微前端使用一个框架，这是最实用的。
每个微前端项目可以放在不同的git存储库中，有自己的package.json和构建工具配置。这样每一个微前端项目都有一个独立的构建打包过程和独立的部署，也就意味着我们可以快速完成我们的微前端项目的打包上线，而不用每次对一个巨无霸（Monolith）项目进行操作，后期有新的需求，也只需要修改对应的微前端项目。



## <a id="what"><font color="black">2. 为什么要用微前端</font></a>

目前随着前端的不断发展，企业工程项目体积越来越大，页面越来越多，项目变得十分臃肿，维护起来也十分困难，有时我们仅仅更改项目简单样式，都需要整个项目重新打包上线，给开发人员造成了不小的麻烦，也非常浪费时间。老项目为了融入到新项目也需要不断进行重构，造成的人力成本也非常的高。

>  在前端开发工作中，面临的困难：

1. 企业工程项目越来越大，项目构建部署速度慢。
2. 工程团队人员较多，技术栈难以统一，异地团队间沟通成本高，开发代码容易冲突，会影响整个项目。
3. 旧项目重构，代码改动太大，消耗时间严重。	

> 对比分析：

1. 具有独立运行、独立部署功能，构建部署速度快。
2. 技术栈无关，具有独立开发功能，避免开发冲突，减少协作成本。
3. 旧项目可以作为微前端项目一部分，避免重构。



## <a id="what"><font color="black">3. 微前端实现方式</font></a>

微前端实现方式有两种：

1.iframe嵌入 （难度：★）

2.single-spa合并类单页应用 （难度：★★★★★）

## <a id="what"><font color="black">4. iframe</font></a>

iframe嵌入方式比较容易实现，不再赘述。

#### Why Not Iframe

> 为什么不用 iframe，这几乎是所有微前端方案第一个会被 challenge 的问题。但是大部分微前端方案又不约而同放弃了 iframe 方案，自然是有原因的，并不是为了 "炫技" 或者刻意追求 "特立独行"。

> iframe 最大的特性就是提供了浏览器原生的硬隔离方案，不论是样式隔离、js 隔离这类问题统统都能被完美解决。但他的最大问题也在于他的隔离性无法被突破，导致应用间上下文无法被共享，随之带来的开发体验、产品体验的问题。

> 1. url 不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。
> 2. UI 不同步，DOM 结构不共享。想象一下屏幕右下角 1/4 的 iframe 里来一个带遮罩层的弹框，同时我们要求这个弹框要浏览器居中显示，还要浏览器 resize 时自动居中.
> 3. 全局上下文完全隔离，内存变量不共享。iframe 内外系统的通信、数据同步等需求，主应用的 cookie 要透传到根域名都不同的子应用中实现免登效果。
> 4. 慢。每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程。

> 其中有的问题比较好解决(问题1)，有的问题我们可以睁一只眼闭一只眼(问题4)，但有的问题我们则很难解决(问题3)甚至无法解决(问题2)，而这些无法解决的问题恰恰又会给产品带来非常严重的体验问题， 最终导致我们舍弃了 iframe 方案。

> 参考文章：
> [Why Not Iframe](https://www.yuque.com/kuitos/gky7yw/gesexv)

## <a id="what"><font color="black">5. single-spa</font></a>

>  single-spa实现原理：
>
> 首先对微前端路由进行注册，使用single-spa充当微前端加载器，并作为项目单一入口来接受所有页面URL的访问，根据页面URL与微前端的匹配关系，选择加载对应的微前端模块，再由该微前端模块进行路由响应URL，即微前端模块中路由找到相应的组件，渲染页面内容。
>

> 参考文章：
> [single-spa官网](https://single-spa.js.org/)



### 3. 微前端实现过程

#### 3.1 基座项目（父项目改造）

> 基座项目创建：

```javascript
yarn create react-app portal
yarn add antd
```

> 基座项目创建：

```javascript
yarn create react-app portal
```

```javascript
import * as singleSpa from 'single-spa';

singleSpa.registerApplication(
    'react',
    () => import('./main.js'),
    (location) => location.pathname.startsWith('/react'), {
        some: 'value'
    }
);

singleSpa.start();
```

> registerApplication参数含义：
>
> 一、应用名称：
> 第一个参数是一个字符串名称。
>
> 二、加载函数或者应用：
> 第二个参数是一个返回promise加载函数或者已解析的应用。
>
> 1. 应用作为参数，该参数由一个带有生命周期的对象组成。
>
> ```js
> const application = {
>   bootstrap: () => Promise.resolve(), //bootstrap function
>   mount: () => Promise.resolve(), //mount function
>   unmount: () => Promise.resolve(), //unmount function
> }
> registerApplication('applicatonName', application, activityFunction)
> ```
>
> 2. 加载函数作为参数必须返回一个promise或者异步函数，第一次加载应用程序时，将不带任何参数地调用该函数，返回promise必须和应用一起解决。最常见的加载函数导入方式是：`() => import('/path/to/application.js')`
>
> 三、动态函数（activity function）
> 第三个参数必须是一个纯函数，函数将window.location作为第一个参数提供，并在应用程序处于活动状态时返回一个判断结果。常见使用时，通过动态函数（activity function）第一个参数判断子应用是否处于激活状态。



#### 3.2 微前端项目（子项目改造）

Vue子项目

> npm install -g @vue/cli

react子项目

> yarn create react-app react
>yarn add single-spa-react

<img src="C:\Users\李子杰\AppData\Roaming\Typora\typora-user-images\image-20200511222559799.png" alt="image-20200511222559799" style="zoom:33%;" />

<img src="C:\Users\李子杰\AppData\Roaming\Typora\typora-user-images\image-20200512000252709.png" alt="image-20200512000252709" style="zoom:33%;" />

<img src="C:\Users\李子杰\AppData\Roaming\Typora\typora-user-images\image-20200512000311275.png" alt="image-20200512000311275" style="zoom:33%;" />

图片地址：	http://localhost:3000/static/media/logo.5d5d9eef.svg<img src="C:\Users\李子杰\AppData\Roaming\Typora\typora-user-images\image-20200512000423411.png" alt="image-20200512000423411" style="zoom:33%;" />

<img src="C:\Users\李子杰\AppData\Roaming\Typora\typora-user-images\image-20200512001420941.png" alt="image-20200512001420941" style="zoom:33%;" />







angular子项目

> npm install @angular/cli@9.0.0 -g
> ng new my-app
> ng serve --open
> ng e2e
> 准备工作：
> npm i -D @angular-builders/custom-webpack
> npm i -D @angular-builders/dev-server

```javascript
npm install -g @angular/cli
//直接安装报错



```

> 参考项目地址：https://github.com/joeldenning/coexisting-angular-microfrontends
> 参考官网地址：https://single-spa.js.org/docs/ecosystem-angular/#manual-installation
> [APP_BASE_HREF](https://angular.io/api/common/APP_BASE_HREF)
> [single-spa-angular](https://single-spa.js.org/docs/ecosystem-angular/#manual-installation)

> [报错为：TypeError: Cannot read property 'flags' of undefined](https://stackoverflow.com/questions/49544854/typeerror-cannot-read-property-flags-of-undefined)



#### 3.3 改造优化

##### 3.3.1 JS文件自动加载

manifest.json生成 生成方法；manifest

##### 3.3.2 JS文件自动加载







#### 

#####   


[Vue-Cli项目如何查看依赖调用关系？](https://www.cnblogs.com/rever/p/10978703.html)
[sourceMap是个啥？](https://segmentfault.com/a/1190000020213957)

##### webpack build后生成的app、vendor、manifest三者有何职能不同？

> [webpack build后生成的app、vendor、manifest三者有何职能不同？](https://www.jianshu.com/p/7a888571522d)
>

##### webpack中loader（打包方案）

因此，loader是一个打包方案，能对特定类型的文件用相应的方案进行打包。
[Webpack教程四：Loader](https://blog.csdn.net/qq_35732147/article/details/90286681)
[webpack学习笔记—优化缓存、合并、懒加载等](https://www.cnblogs.com/yangmin01/p/6290595.html)

##### assetsPublicPath
==publicPath属性==

> webpack会在静态文件路径前面添加publicPath的值，当我们把资源放到CDN上的时候，把publicPath的值设为CDN的值就可以了。



==打包上线容易遇到的路径引用问题:==

> 首先检查请求是否合法：请求内容是什么，是请求错误还是代码错误。	
> assetsPublicPath: 'http://127.0.0.1:8000/' 
> [解决 vue-cli index.js dev 配置中 assetsPublicPath 的值不能填 "./" 的问题](https://blog.csdn.net/isyoungboy/article/details/84350256)

```
var ExtractTextPlugin = require('extract-text-webpack-plugin')

extract-text-webpack-plugin

new ExtractTextPlugin({
  filename: utils.assetsPath('css/[name].min.css')
}),
```

  singleSpa.registerApplication注册仅执行一次，再次运行是取之前js文件

```javascript
js文件先于dom元素加载；
vendor.js:19 	TypeError: Cannot convert undefined or null to object
```

> [webpack + vue 项目 自定义 插件 解决 前端 JS 版本 更新 问题](https://www.cnblogs.com/phpdragon/p/7300736.html)
> Webpack 是一个前端资源加载/打包工具。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。
> 它的异步加载原理是，事先将编译好后的静态文件，通过js对象映射，硬编码进打包后的 manifest.xxxx.js 文件中，然后通过JSONP原理按需加载每个chunk。



> [详解CommonsChunkPlugin的配置和用法](https://segmentfault.com/a/1190000012828879)



> [webpack基础--代码分割和懒加载](https://blog.csdn.net/rainbow8590/article/details/81027696)

> [彻底解决Webpack打包性能问题](https://zhuanlan.zhihu.com/p/21748318)



> [ant design pro 如何使用 qiankun 做微前端（上）](https://zhuanlan.zhihu.com/p/93198281)

>  ==React项目中runtime-main.js也需要引入到项目中==

```
 React项目中runtime-main.js也需要引入到项目中
 await runScript('http://127.0.0.1:8888/static/js/runtime-main.js');
 await runScript('http://127.0.0.1:8888/static/js/2.chunk.js');
 await runScript('http://127.0.0.1:8888/static/js/main.chunk.js');
```



![这里写图片描述](https://img-blog.csdn.net/20180713104632583?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3JhaW5ib3c4NTkw/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

![image-20200415212256372](C:\Users\李子杰\AppData\Roaming\Typora\typora-user-images\image-20200415212256372.png)

CSS沙箱CSS modules 
CSS处理用到postcss-loader，postcss-loader用到postcss，我们添加postcss的处理插件，为每一个CSS选择器都添加名为`.namespace-kaoqin`的根选择器，最后打包出来的CSS，如下所示：

JS沙箱

然后配置 nginx

```javascript
server {
    listen 8080;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;
    ssi on;

    # 将 / 重定向到 /browse
    rewrite ^/$ http://localhost:8080/browse redirect;

    # 根据路径访问 html 
    location /browse {
      set $PAGE 'browse';
    }
    location /order {
      set $PAGE 'order';
    }
    location /profile {
      set $PAGE 'profile'
    }

    # 所有其他路径都渲染 /index.html
    error_page 404 /index.html;
}
```



加载子应用的方式：

![image-20200415211849524](C:\Users\李子杰\AppData\Roaming\Typora\typora-user-images\image-20200415211849524.png)









## <a id="title9"><font color="black">参考文章</font></a>

- [微前端实践 ](https://juejin.im/post/5cadd7835188251b2f3a4bb0)

- [微前端 —— portal项目](https://segmentfault.com/a/1190000019957130)

- [全栈增长工程师](https://segmentfault.com/blog/phodal?page=1)(微前端如何落地？详细原理)

- [命令行服务器（http-server)和跨域](https://blog.csdn.net/weixin_43310551/article/details/86304618)

- [Single-Spa + Vue Cli 微前端落地指南 (项目隔离远程加载，自动引入)](https://juejin.im/post/5dfd8a0c6fb9a0165f490004#heading-9)

- [可能是你见过最完善的微前端解决方案](https://zhuanlan.zhihu.com/p/78362028)

- [前端分享会--微前端改造初探](https://www.jianshu.com/p/81350e1068b6)

- [带你手写微前端框架](https://github.com/YataoZhang/my-single-spa/issues/4)

- [深入剖析Vue源码 - 完整挂载流程和模板编译](https://juejin.im/post/5ccafd4d51882540d472a90e)

  

- 


## <a id="title10"><font color="black">参考代码</font></a>

- [乾坤](https://github.com/umijs/qiankun)

- [migrating-to-single-spa-react-starter餐车栗子from官网](https://github.com/alocke12992/migrating-to-single-spa-react-starter)

- [microfront-end-single-spa](https://github.com/justwiner/microfront-end-single-spa)

  
