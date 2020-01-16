# 微前端入门指南

## 0. 关于

最近一段时间，由于未来工作中涉及工业应用较多，最后项目的展示交互可能会由于开发技术栈不同产生冲突，单一前端框架可能不再能满足要求，避免技术栈的冲突，解决不同技术栈的开发后的项目融合问题，开始对微前端进行研究尝试，希望借助微前端可以解决技术栈冲突的问题。

在被微前端虐的体无完肤后，终于自己也有了自己的收获，在本文档中主要是自己在学习过程中的一些收获和在写例子中遇到的问题，希望对您也能有多帮助。

当然微前端的实现方式不只有一种，包括iframe、single-spa等，本文采用的主要是single-spa。如果您使用过iframe我可以告诉您，iframe和single-spa完全不是一个难度，如果把iframe比作是easy模式，那么single-spa便是地狱模式，相信也有很多人在想搞一下微前端的同学们，猝死在了single-spa的路上，single-spa主要难点在于需要搭设拆分后小型项目的框架，使其实现具有<font color="red">独立开发、独立运行、独立部署</font>的能力，并且将其整合成一个完成的应用。

在toB的前端
背景->排查->解决->防止，以解决某个事故为例来介绍。
如何从何而来，为什么采用，采用的优点缺点是什么，具体实施过程，实施过程中遇到的bug，
[(转)一位大牛对于写技术博客的一些建议](https://www.cnblogs.com/princepeng/p/11174085.html)
[技术博客文章的写作思路总结](https://my.oschina.net/FEEDFACF/blog/1610191)



## Contents

- [引言](#preface)

- [微前端是什么](#what)

- [参考文章](#title9)

- [参考代码](#title10)

  

## <a id="what"><font color="black">1. 微前端是什么</font></a>

微前端是什么？微前端是借鉴后端微服务的概念而来，将微服务的理念应用在浏览器端，即将一个完整的、庞大的，单一的前端工程项目拆分为多个小型的前端项目。

简单的来说，就是将一个巨无霸（Monolith）的前端工程拆分成一个个的小工程，但是每一个小的工程的功能却是完整的，可以独立成为一个项目，完全具备独立的开发、部署、运行的能力。整个项目将由这些个小项目整合而成。



## <a id="what"><font color="black">2. 为什么要用微前端</font></a>

目前随着企业工程项目体积原来越大，页面越来越多，项目变得十分臃肿，维护起来也十分困难，有时我们仅仅更改项目的简单样式，都需要对整个项目重新进行打包上线，给开发人员造成了不少的麻烦，也非常了很多浪费时间。

在协作上，随着项目越来越大，开发团队也在不断的壮大，有时我们希望不同地点不同团队对同一项目来进行开发维护，未使用微前端拆分前，团队间的沟通成本很高，并且不同团队成员在代码提交过程中容易产生冲突。

因此，前端在借鉴后端的微服务架构模式后，开发出了微前端架构，将一个功能繁多的单页面应用拆分成一个个小型单页面应用，这些小型单页应用具有和整体应用相同的能力。



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

## <a id="what"><font color="black">5. single-spa</font></a>

>  [single-spa官网](https://single-spa.js.org/)
>
> single-spa实现原理：
>
> 首先对微前端路由进行注册，使用single-spa充当微前端加载器，并作为单一入口来接受所有页面URL的访问，根据页面URL与微前端的匹配关系，选择加载对应的微前端模块，再由该微前端模块进行路由响应URL，即微前端模块中路由找到相应的组件，渲染页面内容。
>

### 0. 单体应用比前端微服务化

<img src="https://user-gold-cdn.xitu.io/2018/9/18/165ea5594bbb97ef?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" alt="img" style="zoom:50%;" />

### 1. 微前端架构

<img src="https://user-gold-cdn.xitu.io/2018/9/18/165ea5594bd56c52?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" alt="img" style="zoom:50%;" />

single-spa

目前在前端开发工作中，
目前随着企业工程项目体积越来越大



实现原理：
实现不同项目嵌套当然可以使用ifame，但是微前端并没有用到ifame，而是单纯的使用JavaScript和MVVM等技术来实现页面的加载。
我们也把这种由多个微前端聚合出来的单页应用叫做“类单页应用”。





### 3. 微前端实现过程

> 

#### JS文件自动加载

##### manifest.json生成   

anifest
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

> [微前端改造初探](https://segmentfault.com/a/1190000019718750?utm_source=tag-newest)

> [微前端详细实施原理](https://alili.tech/tags/%E5%BE%AE%E5%89%8D%E7%AB%AF/)

> [Web Components 入门实例教程](http://www.ruanyifeng.com/blog/2019/08/web_components.html)

>  [ant design pro 如何使用 qiankun 做微前端（上）](https://zhuanlan.zhihu.com/p/93198281)

>  ==React项目中runtime-main.js也需要引入到项目中==

```
 React项目中runtime-main.js也需要引入到项目中
 await runScript('http://127.0.0.1:8888/static/js/runtime-main.js');
 await runScript('http://127.0.0.1:8888/static/js/2.chunk.js');
 await runScript('http://127.0.0.1:8888/static/js/main.chunk.js');
```



![这里写图片描述](https://img-blog.csdn.net/20180713104632583?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3JhaW5ib3c4NTkw/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)



> [深入剖析Vue源码 - 完整挂载流程和模板编译](https://juejin.im/post/5ccafd4d51882540d472a90e)

> [Single-Spa + Vue Cli 微前端落地指南 (项目隔离远程加载，自动引入)](https://juejin.im/post/5dfd8a0c6fb9a0165f490004)

>[带你手写微前端框架](https://github.com/YataoZhang/my-single-spa/issues/4)



## <a id="title9"><font color="black">参考文章</font></a>

- [single-spa官网](https://single-spa.js.org/)
- [微前端实践](https://juejin.im/post/5cadd7835188251b2f3a4bb0)
- [用微前端的方式搭建类单页应用](https://www.cnblogs.com/meituantech/p/9604591.html)（以美团为例）
- [前端单页应用微服务化解决方案2 - Single-SPA](https://juejin.im/post/5ba057695188255c953821c6)
- [稍复杂例子single-spa-examples](https://github.com/CanopyTax/single-spa-examples.git)
- [微前端 single-spa（独立部署内附代码）](https://juejin.im/post/5d3925615188257f3850de5a)
- [微前端 —— 理论篇](https://segmentfault.com/a/1190000019957130)
- [微前端入门  —— 餐饮项目](https://juejin.im/post/5d8adb8ff265da5ba12cd173#heading-0)
- [微前端 single-spa —— 内附项目](https://juejin.im/post/5d3925615188257f3850de5a)
- [全栈增长工程师](https://segmentfault.com/blog/phodal?page=1)
- [实施微前端的六种方式](https://segmentfault.com/a/1190000015566927)
- [微前端 —— 理论篇（实际项目参考文章）](https://segmentfault.com/a/1190000019957130)
- [microfront-end-single-spa](https://github.com/justwiner/microfront-end-single-spa)
- [命令行服务器（http-server)和跨域](https://blog.csdn.net/weixin_43310551/article/details/86304618)


## <a id="title10"><font color="black">参考代码</font></a>

- [乾坤](https://github.com/umijs/qiankun)
- [微前端模块加载器](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FFantasy9527%2Flotus-scaffold-micro-frontend-portal)
- [微前端Base App示例源码](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FFantasy9527%2Fmicrofrontend-base-demo)
- [微前端子项目示例源码](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FFantasy9527%2Fmicrofrontend-submodule-demo)
- [Single-SPA微前端框架的使用Demo汇总](https://alili.tech/archive/22975f44/)
- [migrating-to-single-spa-react-starter源自官网](https://github.com/alocke12992/migrating-to-single-spa-react-starter)
