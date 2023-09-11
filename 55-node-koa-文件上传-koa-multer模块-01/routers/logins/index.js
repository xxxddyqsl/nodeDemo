// 引入 koa 路由模块
const Router = require('koa-router')

// new 将路由模块 实例化
const router =new Router();

/*
 在 index.js 入口文件 中 当前路由模块 被注册成了 路由级中间件 ，并且 path 一级路径 为'/home',
 
 因此当前 homes 文件夹下index.js  封装的 路由为二级路径  想要通过 http://localhost:4399/home/ 此二级路径就不需要写然后东西了
 除非 需要二级路径 
*/

// 请求写法1：常规的写法 

// get 请求 获取 数据
router.get('/', async (ctx,next)=>{  // 请求路径 ：http://localhost:4399/home/  请求方式： get
      

   // koa 获取 cookie 
   // console.log(ctx.cookies.get('_id'))
    // koa 设置 cookie - 包含中文 需要 通过 encodeURI 进行编码 否则报错 这个cookie 前端是无法获取的 只能在前后端传输的时候 获取到
   // ctx.cookies.set('name',encodeURI('123小明'))
   // console.log(ctx.cookies.get('name'))
   await ctx.render('login',{Code: 0,Data:{},Message:'测试'})
})

// 导出
module.exports = router;