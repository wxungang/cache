/**
 sw created by xiaogang on 2018/1/12
 功能描述：简单的实现缓存 功能！
 */

/**
 * 更新汇总
 *
 *      1、更新 cacheName 等待浏览器重启之后 新的sw 文件接管 （需要配合 activate 事件）
 *      2、install event 中 执行 self.skipWaiting(); 只需要sw文件有任何的更新 既可实现更新 （其实触发了install事件，重新拉取文件实现更新缓存！cache.addAll(cacheFiles) 不会被fetch拦截代理）
 *
 *
 */


const cacheName = 'sw_cache_update';
/**
 * 需要缓存的 文件列表
 * @type {string[]}
 */
const cacheFiles = [
    '/',
    './index.html',
    './script/page.js',
    './style/page.css'
];

/**
 * sw install 事件（生命周期）
 *      推荐做缓存 工作！（也可以什么都不做）
 *
 * caches.open(cacheName).then()
 *      缓存相关操作 完全可以在页面加载等任何时候处理。（具体参考 官方文档 或者 cache 目录demos）
 *      只是单纯的缓存起来，不配合sw.fetch 没法 做拦截代理。所以推荐在install成功之后 再缓存

 *
 */
self.addEventListener('install', InstallEvent => {
    //sw 更新之后立即 接管替换旧的 sw （无需 activate 事件）
    self.skipWaiting();
    console.log(InstallEvent);
    //waitUntil :
    InstallEvent.waitUntil(
        //链接 对应的cache ,并进行下载 & 缓存 数据！
        caches.open(cacheName).then(cache => {
            cacheKey(cache, 'cacheFiles added before');
            return cache.addAll(cacheFiles).then(data => {
                console.log(data);//undefined
                cacheKey(cache, 'cacheFiles added after');
            });
        })
    );
});


/**
 * fetch 事件（生命周期）
 *      实现 缓存的关键。可以拦截和代理 页面的请求！
 *
 * 问题：
 *      怎么更新！！！！
 *
 *
 */
self.addEventListener('fetch', FetchEvent => {
    console.log(FetchEvent);
    FetchEvent.respondWith(
        caches.match(FetchEvent.request).then(response => {
            console.log(response);
            //已经缓存 直接返回 。没有则重新fetch 同时更新到缓存中！
            return response || fetch(FetchEvent.request).then(response => {
                /**
                 * 在 fetch 请求中添加对 .then() 的回调。

                 * 获得响应后，执行以下检查：

                 * 确保响应有效。

                 * 检查并确保响应的状态为 200。

                 * 确保响应类型为 basic，亦即由自身发起的请求。 这意味着，对第三方资产的请求不会添加到缓存。

                 * 如果通过检查，则克隆响应。这样做的原因在于，该响应是 Stream，因此主体只能使用一次。由于我们想要返回能被浏览器使用的响应，并将其传递到缓存以供使用，因此需要克隆一份副本。我们将一份发送给浏览器，另一份则保留在缓存。
                 *
                 */
                // Check if we received a valid response
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                // IMPORTANT: Clone the response. A response is a stream
                // and because we want the browser to consume the response
                // as well as the cache consuming the response, we need
                // to clone it so we have two streams.
                var responseToCache = response.clone();

                caches.open(cacheName)
                    .then(function (cache) {
                        cache.put(FetchEvent.request, responseToCache);
                    });

                return response;
            });
        })
    );
});

/**
 * activate 事件（生命周期）
 *      缓存更新的关键！ （缓存管理控制！）
 *
 *      1、更新您的服务工作线程 JavaScript 文件。用户导航至您的站点时，浏览器会尝试在后台重新下载定义服务工作线程的脚本文件。如果服务工作线程文件与其当前所用文件存在字节差异，则将其视为“新服务工作线程”。
 *      2、新服务工作线程将会启动，且将会触发 install 事件。
 *      3、此时，旧服务工作线程仍控制着当前页面，因此新服务工作线程将进入 waiting 状态。
 *      4、当网站上当前打开的页面关闭时，旧服务工作线程将会被终止，新服务工作线程将会取得控制权。
 *      5、新服务工作线程取得控制权后，将会触发其 activate 事件。
 *
 *      //install event中  使用self.skipWaiting(); 可以使 sw 更新之后立即 接管替换旧的 sw （无需 activate 事件）
 */
self.addEventListener('activate', ActivateEvent => {
    console.log(ActivateEvent);
    //
    ActivateEvent.waitUntil(
        updateCacheName()
    );
    /*
     * Fixes a corner case in which the app wasn't returning the latest data.
     * You can reproduce the corner case by commenting out the line below and
     * then doing the following steps: 1) load app for first time so that the
     * initial New York City data is shown 2) press the refresh button on the
     * app 3) go offline 4) reload the app. You expect to see the newer NYC
     * data, but you actually see the initial data. This happens because the
     * service worker is not yet activated. The code below essentially lets
     * you activate the service worker faster.
     */
    return self.clients.claim();
});

/**
 * 通过 更新cacheName 来 实现更新（即 ：删除旧的 caches[cacheName]）
 * @returns {Promise<any[]>}
 */
function updateCacheName() {
    //caches.keys(): 返回 一个 promise
    return caches.keys().then(cacheNameList => {
        console.log(cacheNameList);
        return Promise.all(
            cacheNameList.map(_cacheName => {
                console.log(_cacheName);
                if (_cacheName !== cacheName) {
                    return caches.delete(_cacheName);
                }
            })
        );
    })
}


/**
 * 没啥 实际作用。
 * @param cache
 * @param tips
 */
function cacheKey(cache, tips) {
    cache.keys().then(cacheKeyList => {
        console.log(`-------caches[${cacheName}]------${tips}--------------`);
        console.log(cacheKeyList);//request 对象
    });
}