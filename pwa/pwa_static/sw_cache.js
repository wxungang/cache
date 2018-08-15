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
    './script/ajax.js',
    './script/page.js',
    './style/page.css'
];

const cacheWhitelist = ['index.html'];

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
    // console.log(InstallEvent);
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
    // console.log(FetchEvent);
    FetchEvent.respondWith(
        caches.match(FetchEvent.request).then(response => {
            //已经缓存 直接返回 。没有则重新fetch 同时更新到缓存中！
            return responseTimeout(response, FetchEvent.request) || fetch(FetchEvent.request).then(response => {
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
                //
                if (cacheWhitelist.indexOf('') >= 0) {
                }
                // IMPORTANT: Clone the response. A response is a stream
                // and because we want the browser to consume the response
                // as well as the cache consuming the response, we need
                // to clone it so we have two streams.
                let responseToCache = response.clone();
                console.log(responseToCache);
                caches.open(cacheName)
                    .then(function (cache) {
                        cache.put(FetchEvent.request, responseToCache);
                    });
                //
                return responseTimeout(response, FetchEvent.request);//response
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

let _requestTimeout = {};

/**
 * 定时 timeout 内不重复调用！
 * sw 层统一封装
 * @param response
 * @param request
 * @returns {*}
 */
function responseTimeout(response, request) {
    if (!response) {
        //response 不存在直接 返回获取 服务端最新的
        return response
    }
    let _url2Obj = url2Obj(request.url);
    let _timeout = _url2Obj.timeout || 0;
    let _resTimeout = _requestTimeout[response.url];

    let _now = (new Date()).getTime() / 1000; //单位秒
    console.log(response.timeout);

    if (_timeout && _resTimeout) {
        console.log(request.url);
        console.log(_now - _resTimeout);
        // 请求设置 _timeout & response 有更新 timeout (即 不是第一次)
        if (_now - _resTimeout > _timeout) {
            // 过期 删除 缓存
            caches.open(cacheName)
                .then(function (cache) {
                    cache.delete(request).then(data => {
                        if (data) {
                            delete _requestTimeout[response.url];
                        }

                    });
                });
        }
        //删除之后立即获取最新的数据 （或者 下次获取 最新的数据）
        // return null;
    } else {
        console.log(response);
        // 请求没有设置 _timeout 或者 response 没有 timeout (即 第一次请求)
        // response.timeout = _now;
        // response.__proto__.timeout = _now;
        _requestTimeout[response.url] = _now
    }
    console.log('------------_requestTimeout--------------');
    console.log(_requestTimeout)
    return response;
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

function url2Obj(str) {
    if (!str) {
        //单页面 hash 模式下 search ='';
        str = location.search || location.hash || location.href;
    }

    var query = {};

    str.replace(/([^?&=]*)=([^?&=]*)/g, function (m, a, d) {
        if (typeof query[a] !== 'undefined') {
            query[a] += ',' + decodeURIComponent(d);
        } else {
            query[a] = decodeURIComponent(d);
        }
    });

    return query;
}
