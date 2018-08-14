/**
 * Created by xiaogang on 2018/6/1.
 *
 */
"use strict";
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const Router = require('koa-router');
const config = require('./config/default')
const serve = require('koa-static');

const app = new Koa();
const router = new Router();

//static
app.use(serve(__dirname + "/entry/", {extensions: ['html']}));
app.use(serve("../cache", {
    maxage: 1000 * 60,//1分钟
    extensions: ['html']
}));
app.use(serve("../pwa", {
    maxage: 1000 * 60,//1分钟
    extensions: ['html']
}));


//单项目情况
// const routes = require('./routes/koa_route_index');
// routes(router);

//多项目 路由 配置
// uci_react
try {
    const uci_reactRoutes = require('./routes/uci_react/routes/koa_route_index');
    uci_reactRoutes(router);
} catch (e) {
    console.log(e)
}


//跨域
app.use(cors());
//post 入参处理！
app.use(bodyParser());


//加载 路由中间件
app.use(router.routes())
    .use(router.allowedMethods());

//启动服务
app.listen(config.port, () => {
    console.log('The koa mock is running at http://localhost:' + config.port);
});
