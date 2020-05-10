import singleSpaVue from "single-spa-vue";
import Vue from 'vue'
import App from './App.vue'

const vueOptions = {
    el: "#vue",
    render: h => h(App)
};

// singleSpaVue包装一个vue微前端服务对象
const vueLifecycles = singleSpaVue({
    Vue,
    appOptions: vueOptions
});

// 导出生命周期对象
export const bootstrap = vueLifecycles.bootstrap; // 启动时
export const mount = vueLifecycles.mount; // 挂载时
export const unmount = vueLifecycles.unmount; // 卸载时
export default vueLifecycles;