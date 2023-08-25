// 引入 koa
const koa = require('koa')
// new 进行koa 实例化
const app = new koa()
// 修正文件路径
const path = require('path')// 如 使用path.join(__dirname, 'public')为根据windows或Linux系统环境拼接的绝对路径
// 引入 静态资源模块管理
const static= require('koa-static')
// 导入 封装的 路由 入口文件
const router = require('./routers')
//  导入 koa-views 模块
const views = require('koa-views');
// 导入 koa-session-minimal 模块 使用session 登录鉴权
const session = require('koa-session-minimal')

// koa 获取 post 请求参数 需要导入 koa-bodyparser 模块  koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
const bodyParser = require('koa-bodyparser')
// 将 koa-bodyparser 模块 配置 注册成应用级中间件
app.use(bodyParser());// 获取前端 post请求 传入的参数

//  配置 ejs 模板引擎 配置 注册成应用级中间件
app.use(views(path.join(__dirname,'./views'),{// views文件夹路径
    extension:'ejs',//  调用 通过 ejs 引擎来解析 模板页
}))
//  koa-session-minimal 配置 注册成应用级中间件  secret:'qweqp5866ok',// 密钥
app.use(session({
    key:'xingSystem',// key 可选的， 生成的cookie名字
    cookie:{
        maxAge: 1000*60*60,// 配置cookie 过期时间 - 单位为 毫秒 1000*60 = 1分钟 1000*60*60=1小时 当前设置 1个小时 过期
    }
}))

// 静态资源模块管理 配置注册 成 应用级中间件 - 测试是否能够获取到静态资源 访问：http://localhost:4399/html/test.html
app.use(static(
    path.join(__dirname,'public')// path.join 连接 __dirname（字符串指向当前正在执行脚本的）绝对路径 ，和 public （此时相对路径的文件夹）在根据windows或Linux系统环境拼接的绝对路径
));

// 注意 koa 中注册 应用级中间件的时候 尽量写成 async/await 的形式(等待异步执行完) 因为 在 next() 调用 下一个 中间件 可能存在异步的情况 需要等待执行完 下一个 中间件
// session 拦截 -  配置 应用级中间件 校验 session+cookie -登录成功之后 会设置 session  案例在 routers文件夹下的users文件夹的index.js 内可见 登录接口
app.use( async (ctx,next)=>{
    console.log(ctx.url)
    // 排除 login登录相关的接口和路由
    if(ctx.url.includes('login')){
        // 调用 下一个 中间件
        await next()
        // 控制器回来 后面的代码 不在执行
        return
    }
    console.log(ctx.session)
    // session.user 存入的个人信息 存在 说明未失效
    if(ctx.session.user){
        // 更新修改 session 值 而 koa-session-minimal 模块 因为当前session发生改变 会自动更新 session 过期时间
        ctx.session.date=  Date.now(); // 获取时间戳 修改
        // next 放行 调用下一个中间件
       await next()
    }else{
        console.log('session 失效 路由重定向')
        // session 失效 路由重定向
        ctx.redirect('/login')
    }
})
// 将 导入的路由 注册成 应用级中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(4399,()=>{
    console.log('OK,服务器创建成功-回调')
})