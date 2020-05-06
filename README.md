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

#### 3.1 基座项目

> 基座项目创建：

```javascript
yarn create react-app portal
yarn add antd
```

> 基座项目创建：

```javascript
yarn create react-app portal
```







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

![image-20200415212256372](C:\Users\李子杰\AppData\Roaming\Typora\typora-user-images\image-20200415212256372.png)

CSS沙箱CSS modules 
JS沙箱



在toB的前端
背景->排查->解决->防止，以解决某个事故为例来介绍。
如何从何而来，为什么采用，采用的优点缺点是什么，具体实施过程，实施过程中遇到的bug，
[(转)一位大牛对于写技术博客的一些建议](https://www.cnblogs.com/princepeng/p/11174085.html)
[技术博客文章的写作思路总结](https://my.oschina.net/FEEDFACF/blog/1610191)





加载子应用的方式：

![image-20200415211849524](C:\Users\李子杰\AppData\Roaming\Typora\typora-user-images\image-20200415211849524.png)







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
