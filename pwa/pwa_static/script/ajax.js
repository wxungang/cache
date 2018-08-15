/**
 * Created by xiaogang on 2018/8/15.
 *
 */
"use strict";

/**
 * get 请求 拦截 （可以根据参数差异化缓存！）
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
        $('#ajax_get').text(JSON.stringify(data));
    },
    error: function (xhr, type) {
        console.log(xhr)
        console.log(type)
    }
})
