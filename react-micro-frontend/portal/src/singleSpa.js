import * as singleSpa from 'single-spa';



const runScript = async (url) => {
    // const im = document.createElement('script');
    // im.type = 'importmap';
    // im.textContent = JSON.stringify(importMap);
    // document.currentScript.after(im);
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        console.log(resolve, script.onload, reject)

        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);
    });
};
const application = {
    // If you're implementing your own lifecycle functions, make sure they are async or return a promise.
    bootstrap: () => Promise.resolve().then(() => {
        // do something
        console.log(1111, document.getElementById('vue'))
        runScript('http://127.0.0.1:8080/js/chunk-vendors.js');
        runScript('http://127.0.0.1:8080/js/app.js');
        return window.singleVue;
    }), //bootstrap function
    mount: async () => {
        // do something
        console.log(3333, document.getElementById('vue'));
        await runScript('http://127.0.0.1:8080/js/chunk-vendors.js');
        await runScript('http://127.0.0.1:8080/js/app.js');
        return window.singleVue;
    }, //mount function
    unmount: () => {
        console.log(222)
        // runScript('http://127.0.0.1:8080/js/chunk-vendors.js');
        // runScript('http://127.0.0.1:8080/js/app.js');
        // return window.singleVue;
    }, //unmount function
}

singleSpa.registerApplication(
    'vue',
    // async () => {
    //         const html = fetch(mfeConfig.target);
    //         const {
    //             cssUrls,
    //             jsUrls
    //         } = match(html, mfeConfig.resourcePatterns);
    //         loadCss(cssUrls);
    //         loadJs(jsUrls);
    //         await runScript('http://127.0.0.1:8080/js/chunk-vendors.js');
    //         await runScript('http://127.0.0.1:8080/js/app.js');
    //         return window.singleVue;
    //     },
    application,
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