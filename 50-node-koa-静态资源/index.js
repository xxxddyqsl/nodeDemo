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


// 静态资源模块管理 配置注册 成 应用级中间件 - 测试是否能够获取到静态资源 访问：http://localhost:4399/html/test.html
app.use(static(
    path.join(__dirname,'public')// path.join 连接 __dirname（字符串指向当前正在执行脚本的）绝对路径 ，和 public （此时相对路径的文件夹）在根据windows或Linux系统环境拼接的绝对路径
));

// 将 导入的路由 注册成 应用级中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(4399,()=>{
    console.log('OK,服务器创建成功-回调')
})