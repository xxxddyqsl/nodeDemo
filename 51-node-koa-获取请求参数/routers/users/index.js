// 引入 koa 路由模块
const Router = require('koa-router')

// new 将路由模块 实例化
const router =new Router();

/*
    router.prefix('/api')
    可以 在路由入口文件中 统一加 前缀的 案例在：routers/index.js 路由入口文件 可见

    也可以在 子路由中单独  加 前缀的

    子路由中单独 加 前缀 请求路径如在：
    http://localhost:4399/user/api/123123 请求方式 put

    注意：当前  router.prefix('/api') 加 前缀 是写在了 get 请求下面 但是 get请求 还是需要加上 前缀的：
    http://localhost:4399/list/api   请求方式  get请求 案例在：routers/lists/index.js 中 可见
    也就是说 router.prefix('/api') 并不受 代码位置影响
    

*/

// router.prefix('/api')
/*
 在 index.js 入口文件 中 当前路由模块 被注册成了 路由级中间件 ，并且 path 一级路径 为'/user',
 
 因此当前 users文件夹下index.js  封装的 路由为二级路径  想要通过 http://localhost:4399/user/ 此二级路径就不需要写然后东西了
 除非 需要二级路径 
*/
// 请求写法2：链式写法 如下
router.get('/',(ctx,next)=>{ // 请求路径 ：http://localhost:4399/user/  请求方式： get
    /*
        访问本地的静态资源 ： http://localhost:4399/html/login.html 内包含了 ajax 请求
        get 请求 获取参数
        方式1：ctx.query 获取到的是 解析之后的对象 如：{ username: '1', password: '2' }
        方式1：ctx.querystring 获取到的是 未解析的 username=1&password=2
    */
    console.log(ctx.query,ctx.querystring)
    ctx.body={Code:0,Data:{username:'小明',age:18}};
}).post('/',(ctx,next)=>{ // 请求路径 ：http://localhost:4399/user/  请求方式： post
    /*
    访问本地的静态资源 ： http://localhost:4399/html/login.html 内包含了 ajax 请求
        post 请求获取参数
        koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
    */
    console.log(ctx.request.body); // 获取到的是 { username: '小明', password: '123123' }
    ctx.body={Code:0,Message:'添加-user-数据成功'}
})
.del('/:id',(ctx,next)=>{ // 请求路径 ：http://localhost:4399/user/123123id 请求方式： delete
    console.log('获取请求参数delete=>',ctx.params)
    ctx.body = {Code:0,Message:'删除-user-数据成功'}
})
.put('/:id',(ctx,next)=>{// 请求路径 ：http://localhost:4399/user/123123id 请求方式： put
    console.log('获取请求参数put=>',ctx.params)
    ctx.body = {Code:0,Message:'修改-user-数据成功'}
})
// 导出
module.exports = router;