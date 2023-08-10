/*
  核心代码 - app.js

*/


var createError = require('http-errors');
var express = require('express'); //导入 express 模块
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();// express 是一个函数 通过执行 得到一个 app 实例 可以通过这个app实例注册中间件等


// view engine setup   设置模板文件引擎
app.set('views', path.join(__dirname, 'views'));// 后端服务器渲染 配置 渲染模板文件的目录 - 在views 中存放模板文件的目录 （ 使用path.join(__dirname, 'views')为根据windows或Linux系统环境拼接的绝对路径）
app.set('view engine', 'ejs');// 设置模板文件引擎 为：ejs 也可以自定义引擎为html 但是需要做好说明，案例在 35-node-express-服务端渲染与客户端渲染-03 中可见

// 常规是开发阶段使用（有没有该模块都可以） 记录请求
app.use(logger('dev'));//记录 发起的请求 显示在终端的请求记录 如 ：GET / 200 10.620 ms - 207 （返回请求的方式(get) 状态码(200) 请求的时间(10.620 ms) 返回的状态码(207)）

// 配置 获取 post请求 和 get请求的携带的参数 的 中间件 案例 31-node-express-获取请求参数 中可见
app.use(express.json());//post请求参数
app.use(express.urlencoded({ extended: false }));//get请求参数

// app.use注册  引用第三方第三方中间件 对前端传入的cookie 进行解析 并且可以设置前端的cookie，使用方式案例 在users.js中
app.use(cookieParser());//解析cookie 并且可以设置前端的cookie，使用方式案例 在users.js中

// 配置 静态资源文件目录 中间件 将public文件夹 设置为静态资源目录  案例 32-node-express-托管静态资源文件 中可见
app.use(express.static(path.join(__dirname, 'public')));//使用path.join(__dirname, 'public')为根据windows或Linux系统环境拼接的绝对路径

//  应用级中间件(挂载在 app 身上的)  ，注册 路由级中间件 indexRouter  、 usersRouter 。几级路径 说明案例 在30-node-express-中间件下的 02-中间件-路由级中间件-01.js 可见说明
app.use('/', indexRouter);// 将 路由模块 挂载在应用级中间件上 ，一级路径 访问地址： http://localhost:3000/
app.use('/users', usersRouter);// 将 路由模块 挂载在应用级中间件上 ，一级路径 访问地址：http://localhost:3000/users

// catch 404 and forward to error handler
/*
  注册 - 第三方 错误中间件 通过使用'http-errors' 第三方库 获取错误信息 如：前面 所有的 请求 接口或者路由 都没有匹配到 返回一个错误信息 404 等等，
  该中间件 代码需要放在所有的 请求和路由之后 否则会直接进入错误中间件 因为 app.use  无path路径 默认所有请求都会执行 为万能匹配

  案例说明在  03-中间件-错误中间件.js  自己封装的错误中间件 中可见讲解说明
*/
app.use(function(req, res, next) {
  //  通过 next(err) 传入 err 参数 给下一个中间件调用 并且通过了'http-errors' 第三方库 createError(404)函数 获取错误信息
  next(createError(404));
});

/*
  // error handler

  上一个  app.use(function(req, res, next) {}) 应用级中间件 注册了错误中间件，
  通过 next(createError(404)) 将错误信息 传入下一个中间件app.use(function(err, req, res, next) {})。

  注意：原本 app.use((req, res, next)=>{}) 应用级中间件是只有3个参数 req 、 res 、next ，
  只有通过 next(参数传入下一个中间件)，才会有4个参数 并且传入的参数在下一个app.use 中是在第一个，4个参数 必须全部写出来，即按顺序： err, req, res, next ，
  不管你后面的参数是否要使用，都要写出来，才能正常访问 传入的 err 变量参数。
*/
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  /*
    res.locals 是固定的 但是 在res.locals 下增加一个message 字段,
    将返回的错误信息err.message 传入 res.locals
    res.locals是一个上下文对象，它可以存活在 我们的 模板文件（如 error.ejs）和 node 流程中 这样在渲染 error.ejs 时 就可以找到 获取 该参数

    可以理解为 渲染模板文件 时 第二种 传值 方式
  */
  res.locals.message = err.message;
  //同上 在res.locals 下增加一个 error 字段, 赋值为 传入的参数 err对象 或一个 {} 空对象
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // err.status 返回错误码  res.status设置状态码
  res.status(err.status || 500);
  /*
    res.render() 服务端渲染页面 渲染error.ejs 模板文件 （可自己定制的错误中间件 模板文件 可以自己随便改造）

    如之前给 ejs模板文件 传入参数的方式1：  res.render('error'，{message：'错误信息'})，如：<h1><%= message %></h1>

    方式2：但是此处 并没有 通过该方式 传入参数， 而是通过 res.locals (增加了 message 字段)
  */
  res.render('error');
});

module.exports = app;
