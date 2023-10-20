// 创建 koa 服务器
const koa = require('koa')
const app = new koa();
// var logger = require('morgan');
// 修正文件路径
const path = require('path')// 如 使用path.join(__dirname, 'public')为根据windows或Linux系统环境拼接的绝对路径
// 引入 静态资源模块管理
const static = require('koa-static')
//  导入 koa-views 模块 - ejs
const views = require('koa-views');
// koa 获取 post 请求参数 需要导入 koa-bodyparser 模块  koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
const bodyParser = require('koa-bodyparser')
// 导入 自定义 封装的 路由模块
const router = require('./routers')
// 导入 自定义 封装 生成及校验 token 模块
const JWT = require('./util/JWT')
//   require('./webSocket');
const loginModel = require('./model/loginModel');
// console.log(SocketServer)
// 将 koa-bodyparser 模块 配置 注册成应用级中间件
app.use(bodyParser())// 解析获取前端 post请求 传入的参数

 // 常规是开发阶段使用（有没有该模块都可以） 记录请求
//  app.use(logger('dev'));//记录 发起的请求 显示在终端的请求记录 如 ：GET / 200 10.620 ms - 207 （返回请求的方式(get) 状态码(200) 请求的时间(10.620 ms) 返回的状态码(207)）

// 静态资源模块管理 配置注册 成 应用级中间件 - 测试是否能够获取到静态资源 访问：http://localhost:4399/html/home.html
app.use(static(
    path.join(__dirname, './public')// path.join 连接 __dirname（字符串指向当前正在执行脚本的）绝对路径 ，和 public （此时相对路径的文件夹）在根据windows或Linux系统环境拼接的绝对路径
))
//  配置 ejs 模板引擎 配置 注册成应用级中间件
app.use(views(path.join(__dirname, './views'),// views文件夹路径
    {
        extension: 'ejs',//  调用 通过 ejs 引擎来解析 模板页
    }
))
//  应用级中间件 - 拦截 校验 token
app.use(async (ctx, next) => {
    console.log('校验 token',ctx.url)
    // 排除 login登录相关的接口和路由
    if (ctx.url.includes('login')) {
        // 调用 下一个 中间件
        await next()
        // 控制器回来 后面的代码 不在执行
        return
    }
    // 获取 前端传入的 token
    let token = ctx.headers['authorization']?.split(' ')[1];
   

    //  token 为真 或者url 包含 api的接口请求  说明前端发起 请求的api 接口必须携带token
    if (token) {
        // 校验token
        const payload = JWT.verify(token);
        if (payload) {
            // 未过期 - 有效 token，重新计算token 过期时间  重新生成token { _id username }加密数据   过期时间-字符串类型(默认毫秒 1000*60 = 1分钟 1000*60*60=1小时 ，或'10s'=>10秒 或'1h'=>1小时 或 '1d'=>1天  )
            const newToken = JWT.generate({ _id: payload._id, username: payload.username }, (1000 * 60 * 5).toString());// 重新计算 过期时间 5 分钟
             // 新生成的 newToken 存入 数据库 users 表
             const newdata = await loginModel.setData('users', {token:newToken,id:payload.id},'id');
             console.log(newdata)
            /*  建议：默认不成文的规范
              后端返回 token时 放在header中 如： ctx.set(自定义字段名，value) // 通常 token的 字段名为 authorization 如下
              设置 token 的 字段名 必须前后端 约定好 使用同一个字段 
              前端传入 token时 也是放在header中
            */
            ctx.set('Authorization', newToken)
            // 调用 next() 放行 直接执行 下一个中间件 
            await next()
        } else {
            // 过期 - 无效toke
            ctx.status = 401;// 设置 错误码
            ctx.body = { Code: -1, Message: 'token 登录令牌已过期，请重新登录' };
        }
    } else {
        //  token 为假 说明并且传入 token 访问的是路由页面
        // 调用 next() 放行 直接执行 下一个中间件
        await next();
    }
})
// 将 导入的路由 注册成 应用级中间件
app.use(router.routes()).use(router.allowedMethods())
// 注册  - 错误中间件 渲染 error.ejs 模板页
app.use(async ( ctx, next)=>{
    let message = ctx.response.message;
    let error = ctx.app.env === 'development' ? ctx : {};
    // 设置 状态码
    ctx.response.status = ctx.response.status || 500;
    // 渲染 自定义 error.ejs 模板页 + 传入错误信息数据
   await ctx.render('error',{message,error})
  });


// app.listen(4399, () => {
//     console.log('OK,服务器创建成功-回调')
// })

module.exports = app;