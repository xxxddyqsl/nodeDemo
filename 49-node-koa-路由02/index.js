// 引入 koa
const koa = require('koa')
// new 进行koa 实例化
const app = new koa()
// 导入 封装的 路由 入口文件
const router = require('./routers/index')

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
// 将 导入的路由 注册成 应用级中间件
app.use(router.routes()).use(router.allowedMethods())
// 启动服务器 -  监听 端口号方式  服务器创建成功时 就会调用 回调函数
app.listen(4399,()=>{
    console.log('OK,服务器创建成功-回调')
})