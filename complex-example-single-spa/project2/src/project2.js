import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import App from './App.vue'

/* 
    这个文件主要是将vue的入口组件作为渲染组件
    将其渲染到portal项目index.html中id为vue的Dom元素中
    注意引入single-spa-vue依赖包
*/
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#vue',
    render: r => r(App)
  }
});

export const bootstrap = [
  vueLifecycles.bootstrap,
];

export const mount = [
  vueLifecycles.mount,
];

export const unmount = [
  vueLifecycles.unmount,
];