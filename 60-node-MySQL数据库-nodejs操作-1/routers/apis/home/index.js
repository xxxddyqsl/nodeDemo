// 引入 koa 路由模块
const Router = require('koa-router');
//C层 controller.js 负责处理请求业务逻辑
const HomeController = require('../../../controllers/homeController')

// new 将路由模块 实例化
const router =new Router();
// get 请求 获取 数据  // 访问地址 http://localhost:4399/api/home/list
router.get('/list', HomeController.list)

router.get('/search',HomeController.search)

router.get('/user',HomeController.addUser)
router.delete('/user',HomeController.deleteUser)
// 导出
module.exports = router;