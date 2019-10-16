## 微前端入门指南

### 关于

最近boss提出个idea，想用微前端来搞一下，奋力挣扎数次，未果。只能开搞。

对于不同框架的项目，使用微前端来做项目的拆分和使用ifame完全不是一个量级。其中坑甚多，不过还好网上资料比较详细，不然可能已经GG了。

## Contents

- [引言](#preface)
- [微前端是什么](#what)
- [参考文章](#title9)
- [参考代码](#title10)

## <a id="preface"><font color="black">引言</font></a>

背景->排查->解决->防止，以解决某个事故为例来介绍。

如何从何而来，为什么采用，采用的优点缺点是什么，具体实施过程，实施过程中遇到的bug，

[(转)一位大牛对于写技术博客的一些建议](https://www.cnblogs.com/princepeng/p/11174085.html)

[技术博客文章的写作思路总结](https://my.oschina.net/FEEDFACF/blog/1610191)



## <a id="what"><font color="black">微前端是什么</font></a>

微前端的产生是借鉴后端微服务的概念而来，将后端为服务的理念应用在浏览器端，即将Web应用由单一的单体应用转变为多个小型前端应用聚合为一的应用。

简单的来说，就是将一个前端巨无霸（Monolith）项目拆分成一个个的小项目，但是每一个小项目又可以独立成为一个单独的项目，可以由各个团队（多人多地）可以单独进行开发，整个项目便由这些小项目整合形成。

实现原理：
实现不同项目嵌套当然可以使用ifame，但是微前端并没有用到ifame，而是单纯的使用JavaScript和MVVM等技术来实现页面的加载。
我们也把这种由多个微前端聚合出来的单页应用叫做“类单页应用”。











## <a id="title9"><font color="black">参考文章</font></a>

- [single-spa官网](https://single-spa.js.org/)

- [微前端实践](https://juejin.im/post/5cadd7835188251b2f3a4bb0)

- [用微前端的方式搭建类单页应用](https://www.cnblogs.com/meituantech/p/9604591.html)（以美团为例）

- [前端单页应用微服务化解决方案2 - Single-SPA](https://juejin.im/post/5ba057695188255c953821c6)

- [稍复杂例子single-spa-examples](https://github.com/CanopyTax/single-spa-examples.git)

- [微前端 single-spa（独立部署内附代码）](https://juejin.im/post/5d3925615188257f3850de5a)

  

## <a id="title10"><font color="black">参考代码</font></a>

- [乾坤](https://github.com/umijs/qiankun)
- [微前端模块加载器](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FFantasy9527%2Flotus-scaffold-micro-frontend-portal)
- [微前端Base App示例源码](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FFantasy9527%2Fmicrofrontend-base-demo)
- [微前端子项目示例源码](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FFantasy9527%2Fmicrofrontend-submodule-demo)
- [Single-SPA微前端框架的使用Demo汇总](https://alili.tech/archive/22975f44/)
- [migrating-to-single-spa-react-starter源自官网](https://github.com/alocke12992/migrating-to-single-spa-react-starter)
