/**
 * Created by xiaogang on 2018/8/14.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Cache
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Cache
 *
 Cache 接口为缓存的 Request / Response  对象对提供存储机制，例如，作为ServiceWorker 生命周期的一部分。请注意，Cache 接口像 workers 一样，是暴露在 window 作用域下的。尽管它被定义在 service worker 的标准中,  但是它不必一定要配合 service worker 使用.

 一个域可以有多个命名 Cache 对象。你需要在你的脚本 (例如，在 ServiceWorker 中)中处理缓存更新的方式。除非明确地更新缓存，否则缓存将不会被更新；除非删除，否则缓存数据不会过期。使用 CacheStorage.open(cacheName) 打开一个Cache 对象，再使用 Cache 对象的方法去处理缓存.

 你需要定期地清理缓存条目，因为每个浏览器都硬性限制了一个域下缓存数据的大小。缓存配额使用估算值，可以使用 StorageEstimate API 获得。浏览器尽其所能去管理磁盘空间，但它有可能删除一个域下的缓存数据。浏览器要么自动删除特定域的全部缓存，要么全部保留。确保按名称安装版本缓存，并仅从可以安全操作的脚本版本中使用缓存。查看 Deleting old caches 获取更多信息.
 *
 * 更多的 cache 方法 可以参考文档。
 *
 */
"use strict";

const cacheName = 'cache_name';
const cacheFiles = [
    './cache.css',
    './util.js'
];

/**
 * 当前域 下的 整个 cache 对象
 * caches.keys(): 返回 一个 promise
 */
function mapCaches(tips) {
    caches.keys().then(cacheNameList => {
        console.log(`-------caches------${tips}--------------`);
        console.log(cacheNameList);//['cache_name']

        cacheNameList.map(cacheName => {
            console.log(cacheName);// 'cache_name'
        })
    })
}

mapCaches('before');

/**
 * 操作具体的 cache
 * caches.open(cacheName)
 */
caches.open(cacheName).then(cache => {
    //具体的 cache 对象
    console.log(cache);

    cacheKey(cache, 'cacheFiles added before');
    /**
     * Cache 接口的 addAll() 方法接受一个URL数组，检索它们，并将生成的response对象添加到给定的缓存中。 在检索期间创建的request对象成为存储的response操作的key。
     * addAll() ：
     *          请求数组对应的url资源。
     *          request对象 作为 key 存储
     *
     */
    cache.addAll(cacheFiles).then(data => {
        console.log(data);//undefined
        mapCaches('after');
        cacheKey(cache, 'cacheFiles added after');
    });


});

function cacheKey(cache, tips) {
    cache.keys().then(cacheKeyList => {
        console.log(`-------caches[${cacheName}]------${tips}--------------`);
        console.log(cacheKeyList);//request 对象
    });
}