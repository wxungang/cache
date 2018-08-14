/**
 功能描述：serviceWorker 注册
 */
"use strict";

/**
 * serviceWorker 注册
 */
if (navigator.serviceWorker) {
    //@formatter:off
    navigator.serviceWorker
        .register('./sw_cache.js')
        .then(registration => {
            document.getElementById('scope').innerText = `Registered events at scope: ${registration.scope}`;
            console.log(registration)
        });

} else {
    document.getElementById('scope').innerText = '你的浏览器 不支持 serviceWorker！\n 可以升级使用最新版的chrome浏览器！';
    console.log('你的浏览器 不支持 serviceWorker！\n 可以升级使用最新版的chrome浏览器！');
}
