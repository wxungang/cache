/**
 * Created by xiaogang on 2018/8/15.
 *
 */
"use strict";

/**
 * get 请求 拦截
 *      不希望 被缓存 可以设置 当前时间戳
 */
$.ajax({
    type: 'GET',
    url: `${location.origin}/uci_react/region/getCity.json`,
    // data to be added to query string:
    data: {
        random: Math.random()
    },
    // type of data we are expecting in return:
    // dataType: 'json',
    timeout: 3000,
    context: $('body'),
    success: function (data) {
        console.log(data)
        $('#ajax_get_random').text(JSON.stringify(data));
    },
    error: function (xhr, type) {
        console.log(xhr)
        console.log(type)
    }
});

/**
 * get 请求 拦截
 *      定时 timeout 内不重复调用！
 *      1、 业务接口层控制 ： parseInt((new Date()).getTime() / (1000 * 60 * 5)) //5分钟内不重复发送
 *      2、 sw 层统一封装 ： 60 * 5 （5分钟）
 */
$.ajax({
    type: 'GET',
    url: `${location.origin}/uci_react/region/getCity.json`,
    // data to be added to query string:
    data: {
        timeout: (1000 * 60 * 1)
    },
    // type of data we are expecting in return:
    // dataType: 'json',
    timeout: 3000,
    context: $('body'),
    success: function (data) {
        console.log(data)
        $('#ajax_get_timeout').text(JSON.stringify(data));
    },
    error: function (xhr, type) {
        console.log(xhr)
        console.log(type)
    }
});

window.util = window.util || {};
(function () {
    this.url2Obj = function (str) {
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
}).call(window.util);
