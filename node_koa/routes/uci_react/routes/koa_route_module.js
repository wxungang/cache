const Router = require('koa-router');
const router = new Router();
const req_proxy = require('../util/req_proxy');
const res_format = require('../util/res_format');

//region
const region_getCity = require('../json/region.getCity');
router.get('region/getCity.json', async (ctx, next) => {
    let _result = null;
    let _query = ctx.request.query;
    let _body = ctx.request.body;
    console.log(_query)
    if (!_query) {
        _result = res_format.response_without_request();
    }

    //如果 前置 路由的校验不通过直接返回
    if (_result) {
        ctx.body = _result;
        return;
    }

    //await 必须放到 async里面使用。！注意 async 的位置
    _result = await req_proxy.get({
        url: 'yourUrl',
        type: 'get',
        data: _query
    });

    ctx.body = _result || region_getCity.default;

});


module.exports = router;
