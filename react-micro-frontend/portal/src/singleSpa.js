import * as singleSpa from 'single-spa';



const runScript = async (url) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);
    });
};


singleSpa.registerApplication(
    'vue',
    async () => {
            await runScript('http://127.0.0.1:8080/js/chunk-vendors.js');
            await runScript('http://127.0.0.1:8080/js/app.js');
            return window.singleVue;
        },
        (location) => location.pathname.startsWith('/vue')
);

singleSpa.registerApplication(
    'react',
    () => {
        return window.singleVue
    },
    (location) => location.pathname.startsWith('/react'), {
        some: 'value'
    }
);

singleSpa.registerApplication(
    'angular',
    () => import('./main.js'),
    // 纯函数根据参数查看是否处于活动状态
    (location) => location.pathname.startsWith('/angular'), {
        some: 'value'
    }
);

singleSpa.start();