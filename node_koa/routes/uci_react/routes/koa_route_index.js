/**
 * Created by xiaogang on 2017/4/4.
 */
"use strict";
const projectName = '/uci_react/';
//router 要使用 app.js 中传过来！
module.exports = function (router) {
  //普通路由
  router.get('/', (ctx) => {
    ctx.body = 'koa root router & Hello World!';
  })

  //使用 use 绑定 子路由 业务！
  const moduleRouter = require('./koa_route_module');
  router.use(projectName, moduleRouter.routes(), moduleRouter.allowedMethods());

  //shop
    // const shopRouter = require('./koa_route_shop');
    // router.use(projectName, shopRouter.routes(), shopRouter.allowedMethods());


  //其他的业务逻辑和数据库逻辑和express没啥区别！后续项目中更新！
}





