// 引入 koa 路由模块
const Router = require('koa-router')

// new 将路由模块 实例化
const router =new Router();


/*
 在 index.js 入口文件 中 当前路由模块 被注册成了 路由级中间件 ，并且 path 一级路径 为'/list',
 
 因此当前 lists 文件夹下index.js  封装的 路由为二级路径  想要通过 http://localhost:4399/list/ 此二级路径就不需要写然后东西了
 除非 需要二级路径 
*/

// 请求写法1：常规的写法 

// get 请求 获取 数据
router.get('/',(ctx,next)=>{  // 请求路径 ：http://localhost:4399/list/  请求方式： get
    ctx.body={Code:0,Data:[111,222,333]};
})

/*
    router.prefix('/api')
    可以 在路由入口文件中 统一加 前缀的 案例在：routers/index.js 路由入口文件 可见

    也可以在 子路由中单独  加 前缀的

    子路由中单独 加 前缀 请求路径如在：
    http://localhost:4399/list/api/123123

    注意：当前  router.prefix('/api') 加 前缀 是写在了 get 请求下面 但是 get请求 还是需要加上 前缀的：
    http://localhost:4399/list/api  get请求 
    也就是说 router.prefix('/api') 并不受 代码位置影响


*/
// router.prefix('/api')


router.post('/',(ctx,next)=>{  // 请求路径 ：http://localhost:4399/list/  请求方式： post
    ctx.body = {Code:0,Message:'添加-数据成功'}
})

// delete 请求 删除 数据 del为delete 简写
router.del('/:id',(ctx,next)=>{ // 请求路径 ：http://localhost:4399/list/  请求方式： delete
    ctx.body = {Code:0,Message:'删除-数据成功'}
})
// put 请求 修改 数据
router.put('/:id',(ctx,next)=>{ // 请求路径 ：http://localhost:4399/list/  请求方式： put
    ctx.body = {Code:0,Message:'修改-数据成功'}
})
// 导出
module.exports = router;