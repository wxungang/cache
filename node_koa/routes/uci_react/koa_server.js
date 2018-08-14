/**
 * mock 中改写。
 * 后续有空 基于此 新增 node_koa2 项目
 */

const Koa = require('koa');
var bodyParser = require('koa-bodyparser');
const Router = require('koa-router');


const app = new Koa();
const router = new Router();

const routes = require('./routes/koa_route_index');
routes(router);

//post 入参处理！
app.use(bodyParser());


//加载 路由中间件
app.use(router.routes())
  .use(router.allowedMethods());

//启动服务
app.listen(3000, () => {
  console.log('The uci_react is running at http://localhost:' + 3000);
});
