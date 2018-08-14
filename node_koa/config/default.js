/**
 * Created by xiaogang on 2018/6/1.
 *
 */
"use strict";
module.exports = {
  port: 1111,
  origin: "http://127.18.18.80:1111",
  publicPath: '/1111',//后台静态资源存储区
  session: {
    secret: 'zling',//加密串
    key: '1104',//客户端展示
    maxAge: 7 * 24 * 60 * 60 * 1000,//存储时间
    userId: 'userId'//服务端用户唯一标识
  },
  mongodb: 'mongodb://localhost:27017/demo',
  mysql: {
    host: 'localhost',
    port: 3306,
    database: "node_mysql",
    user: 'root',
    password: 'root'
  },
  mysql_pool: {
    host: 'localhost',
    port: 3306,
    database: "node_mysql",
    user: 'root',
    password: 'root'
  }
};
