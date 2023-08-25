// 引入 koa
const koa = require('koa')
// 引入 koa 路由模块
const Router = require('koa-router')
// new 进行koa 实例化
const app = new koa()
// new 将路由模块 实例化
const router =new Router();

// 响应 前端 get 请求 
router.get('/login',(ctx,next)=>{
    ctx.body = 'login 页'
})

/*
    如果通过浏览器的 url 访问（浏览器的url访问是get请求）  路径是 http://localhost:4399/list 会报请求方法不对，
    只能是post 请求方法
*/
// 请求写法1：常规的写法
// post 请求 添加 数据
router.post('/list',(ctx,next)=>{
    ctx.body = {Code:0,Message:'添加-数据成功'}
})
// get 请求 获取 数据
router.get('/list',(ctx,next)=>{
    ctx.body={Code:0,Data:[111,222,333]};
})
// delete 请求 删除 数据 del为delete 简写
router.del('/list/:id',(ctx,next)=>{
    ctx.body = {Code:0,Message:'删除-数据成功'}
})
// put 请求 修改 数据
router.put('/list/:id',(ctx,next)=>{
    ctx.body = {Code:0,Message:'修改-数据成功'}
})

// 请求写法2：链式写法 如下
router.get('/user',(ctx,next)=>{
    ctx.body={Code:0,Data:{username:'小明',age:18}};
}).post('/user',(ctx,next)=>{
    ctx.body={Code:0,Message:'添加-user-数据成功'}
})
.del('/user/:id',(ctx,next)=>{
    console.log('获取请求参数delete=>',ctx.params)
    ctx.body = {Code:0,Message:'删除-user-数据成功'}
})
.put('/user/:id',(ctx,next)=>{
    console.log('获取请求参数put=>',ctx.params)
    ctx.body = {Code:0,Message:'修改-user-数据成功'}
})

// 使用 Postman 工具 测试 以上 请求接口

/*
    app.use(router.routes()) ：
        通过 app.use (应用级中间件) 将路由 进行注册 ，注册成 应用级路由中间件 ，
        router.routes() 是一个固定方法，相当于把 router里面所有的路由都拿出来 放在app.use 中进行注册使用。

    use(router.allowedMethods())：
        而后面的第二个 use(router.allowedMethods()) 也是注册 相当于是 app.use(router.allowedMethods()) 只是连着写
        use(router.allowedMethods())的意思是 如上面的 路由 ： router.post('/list',(ctx,next)=>{})
        如下：
        注册的 list 路由是 post 请求，而且通过浏览器的 url 访问（浏览器的url访问是get请求）  路径是 http://localhost:4399/list
        通过 use(router.allowedMethods()) 会返回一个405（405 Method Not Allowed 请求方法出现问题 必须是post 请求）的状态码 报错提示，并且页面 显示：Method Not Allowed，

    因此 注册 use(router.allowedMethods()) 给所有的路由 添加请求方式 ，前端就可以知道 是不是请求的方式不对 如果请求方式不对会有提示


*/
app.use(router.routes()).use(router.allowedMethods())
// 启动服务器 -  监听 端口号方式  服务器创建成功时 就会调用 回调函数
app.listen(4399,()=>{
    console.log('OK,服务器创建成功-回调')
})