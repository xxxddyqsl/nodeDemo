// 引入 koa 路由模块
const Router = require('koa-router');

// new 将路由模块 实例化
const router =new Router();
router.post('/user', async (ctx,next)=>{
    //渲染 ejs模板页
    await ctx.render('login',{Code: 0,Message:'测试'})
})


module.exports = router