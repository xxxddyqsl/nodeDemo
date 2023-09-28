// 引入 koa 路由模块
const Router = require('koa-router');
const loginController = require('../../controllers/loginController')

// new 将路由模块 实例化
const router =new Router();
router.get('/', async (ctx,next)=>{
    //渲染 ejs模板页
    await ctx.render('login',{Code: 0,Message:'测试'})
})
// 登录校验 - post请求 子路由 响应 请求
router.post('/',loginController.login)
// 退出登录 - 销毁 session
router.get('/logout',loginController.logout)

module.exports = router