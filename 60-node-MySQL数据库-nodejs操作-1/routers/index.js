// 路由入口文件 ， 合并  封装的子路由

// 引入 koa 路由模块
const Router = require('koa-router')
// new 将路由模块 实例化
const router =new Router();
// 导入 子路由
const homeRouter = require('./homes')
// 导入 子路由
const apiRouter = require('./apis')
// 将 homeRouter 注册 路由级中间件 ，并且 homeRouter 子路由 合并到 当前的 new 的router 创建的路由模块 中
router.use('/home',homeRouter.routes(),homeRouter.allowedMethods());

// 将 api接口 注册 路由级中间件 ，并且 apiRouter 子路由 合并到 当前的 new 的router 创建的路由模块 中
router.use('/api',apiRouter.routes(),apiRouter.allowedMethods());
// 路由重定向 - http://localhost:4399/ ,重定向 到 http://localhost:4399/home
router.redirect('/','/home');
// 导出 路由
module.exports = router