// 路由入口文件 ， 合并  封装的子路由

// 引入 koa 路由模块
const Router = require('koa-router')
// new 将路由模块 实例化
const router =new Router();
// 导入 封装的 user 子路由+请求
const userRouter = require('./users')
// 导入 封装的 list 子路由+请求
const listRouter = require('./lists')

// 导入 封装的 home 子路由+请求
const homeRouter = require('./homes')

/*
    1：先注册 路由级组件：
    将 封装的 子路由 注册成由级组件 合并到当前 new 的router 创建的路由模块 中

    解释说明：
    导入 封装的 user 子路由 + list 子路由 每一个都是 通过 const router =new Router(); new 实例化一个新的 路由模块 创建的路由，
    彼此之间是没有 任何 联系的， 因此需要 在当前 index.js 中将这几个路由 合在一起。


*/

/*
    router.routes() ：
        将userRouter子路由内所有的路由 进行注册 ，注册成 路由级中间件 ，
        router.routes() 是一个固定方法，相当于把 router里面所有的路由都拿出来 放在 新的 router.use 中进行注册使用。

    router.allowedMethods()：
       router.allowedMethods()  是请求的方式不对 如（原本post请求接口 使用get 方式进行请求 ）
       会返回一个405（405 Method Not Allowed 请求方法出现问题 必须是post 请求）的状态码 报错提示，并且页面 显示：Method Not Allowed，
       前端就可以知道 是不是请求的方式不对 如果请求方式不对会有提示

*/

/*
    在路由入口文件  统一加 前缀的 方式 ：
    router.prefix('/api') 就是下面所有的请求 都需要加上 /api (类似 /api 为 一级路径 /user 为二级路径)
    因此 当前的请求路径 为： http://localhost:4399/api/user/123123

    注意： router.prefix('/api') 并不受 代码位置影响 即使在下面 写prefix()统一加 前缀的 方法 ，
    请求 user 路由 也是需要携带api的 get请求方式：  http://localhost:4399/api/user/
*/
// router.prefix('/api')

// 将 userRouter 注册 路由级中间件 ，并且 userRouter子路由 合并到 当前的 new 的router 创建的路由模块 中
router.use('/user',userRouter.routes(),userRouter.allowedMethods());

//在路由入口文件  统一加 前缀的  并不受 代码位置影响 即使在此处 写prefix()统一加 前缀的 方法 请求 user 也是需要携带api的 get请求方式：  http://localhost:4399/api/user/
// router.prefix('/api') 

// 将 listRouter 注册 路由级中间件 ，并且 listRouter子路由 合并到 当前的 new 的router 创建的路由模块 中
router.use('/list',listRouter.routes(),listRouter.allowedMethods());

router.use('/home',homeRouter.routes(),homeRouter.allowedMethods());

// 路由重定向 - http://localhost:4399/ ,重定向 到 http://localhost:4399/home
router.redirect('/','/home')


// 使用 Postman 工具 测试 以上 请求接口


// 导出 路由
module.exports = router