// index.js 入口文件

/*
    单独封装功能模块的意义 - 解耦（不让模块联系太过紧密） + 提升灵活度 内聚 等等特性
*/

// 导入 创建服务器文件 + 页面路由
const server = require('./server');
// 导入 api 对象
const api = require('./api');
// 导入 路由对象
const router = require('./router');
// 注册api 调用自定义 use方法 合并封装的接口对象
server.use(api);
// 注册router 调用自定义 use方法 合并封装的路由对象
server.use(router);
// 启动 自定义封装的服务器函数
server.start()