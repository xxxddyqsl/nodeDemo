// 引入 koa 路由模块
const Router = require('koa-router')

// new 将路由模块 实例化
const router =new Router();
// 导入 home 相关 api 接口
const  homeApi = require('./home')

// 将 homeRouter 注册 路由级中间件 ，并且 homeRouter 子路由 合并到 当前的 new 的router 创建的路由模块 中
router.use('/home',homeApi.routes(),homeApi.allowedMethods()); // 访问地址 http://localhost:4399/api/home
// 导出
module.exports = router;