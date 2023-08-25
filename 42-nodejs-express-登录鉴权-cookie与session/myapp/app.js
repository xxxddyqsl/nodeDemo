/*
  express生成器说明: 具体说明文件在 36-node-express-生成器 文件夹 中
  核心代码 - app.js

*/


var createError = require('http-errors');
var express = require('express'); //导入 express 模块
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 引入 第三方模块 express-session 生成session
var session = require('express-session')
// 引入 第三方模块 connect-mongo 将 session 存入 MongoDB数据库中
const MongoStore = require('connect-mongo')

var indexRouter = require('./routes/index');
var LoginRouter = require('./routes/login');
var HomeRouter = require('./routes/home');// 自定义路由 - home

var apiRouter = require('./routes/api'); // 自定义封装 api 接口
 

var app = express();// express 是一个函数 通过执行 得到一个 app 实例 可以通过这个app实例注册中间件等

// view engine setup   设置模板文件引擎
app.set('views', path.join(__dirname, 'views'));// 后端服务器渲染 配置 渲染模板文件的目录 - 在views 中存放模板文件的目录 （ 使用path.join(__dirname, 'views')为根据windows或Linux系统环境拼接的绝对路径）
app.set('view engine', 'ejs');// 设置模板文件引擎 为：ejs 也可以自定义引擎为html 但是需要做好说明，案例在 35-node-express-服务端渲染与客户端渲染-03 中可见

// 常规是开发阶段使用（有没有该模块都可以） 记录请求
app.use(logger('dev'));//记录 发起的请求 显示在终端的请求记录 如 ：GET / 200 10.620 ms - 207 （返回请求的方式(get) 状态码(200) 请求的时间(10.620 ms) 返回的状态码(207)）

// 配置 获取 post请求 和 get请求的携带的参数 的 中间件 案例 31-node-express-获取请求参数 中可见
app.use(express.json());//post请求参数
app.use(express.urlencoded({ extended: false }));//get请求参数

// app.use注册  引用第三方第三方中间件 对前端传入的cookie 进行解析 并且可以设置前端的cookie，使用方式案例 在login.js中
app.use(cookieParser());//解析cookie 并且可以设置前端的cookie，使用方式案例 在login.js中

// 配置 静态资源文件目录 中间件 将public文件夹 设置为静态资源目录  案例 32-node-express-托管静态资源文件 中可见
app.use(express.static(path.join(__dirname, 'public')));//使用path.join(__dirname, 'public')为根据windows或Linux系统环境拼接的绝对路径

// app.use注册session中间件  配置第三方中间件  需要写进入 路由之前
/*
  req.session 默认是存在 内存中（内存是：启动服务器时占用的） 当你改动代码 保存时 之前的 session 会丢，
  并且 内存只有那一点大，用户过多session都在内存中 ，内存会被撑满 ，内存溢出 造成服务宕掉 连服务器都得宕机，因此需要存入服务器

  session的基本应用： 1：controllers文件夹下的loginController.js 可见设置session 案例 2：routes文件夹下 home.js 可见校验session 案例
*/
app.use(session({
    // 当前以下几项配置是必备的
    name:'xingSystem',// name可选的， 生成的cookie名字
    secret:'qweqp5866ok',// 密钥(可以随便瞎写)，生成cookie这个值一开始是进行 编码，但是为了防止别人能对比出来 ， 能知道原来这个编码原来是什么（可以通过彩虹表进行比），因此在这加一个密钥（可以随便瞎写），带上密钥别人就猜不出来了
    cookie:{
      maxAge: 1000*60*60,// 配置cookie 过期时间 - 单位为 毫秒 1000*60 = 1分钟 1000*60*60=1小时 当前设置 1个小时 过期

      //  这个cookie 在本地 F12 document.cookie 是无法获取的 必须在 http协议 或 https协议  进行数据交换的时候 所以无需担心 在本地进行 篡改 cookie 的问题
      secure:false,// 为false 表示在http协议也能获取访问到cookie （这个cookie 在本地是无法获取的document.cookie） 为true 表示只有在https协议才能访问cookie
    },
    /*
      resave：true 表示是如果在 配置的过期时间(1小时)内什么操作都没有会过期，
      但是只要在 配置的过期时间(1小时)内 你访问了 路由或接口 并且 重新设置 session 后（当前是在app.use应用级中间件中 校验session 时重新设置：req.session.myDate =   Date.now();），
      这个时候session 才会自动重新计算过期时间 ，否则 session 过期时间 不变。在 查看重新设置 session 重新计算过期时间.jpg 中步骤 可查看过期时间是否发生变化
      需要配合 rolling:true, 使用
    */
    resave:true,
    /*
      saveUninitialized:true,  表示一开始 访问这个网站 立即生成给你一个 cookie，
      但是这个cookie 是无效的。 除非你登录成功之后 操作设置了一下 session 才会有效 设置 session 在 1：controllers文件夹下的loginController.js 可见设置session 案例
      false 表示一开始 访问这个网站 并不会生成一个 cookie， 除非你登录成功之后 操作设置了一下 session 才会第一次给你这个 cookie
    */
    saveUninitialized:true,
    /*
      rolling:true,
      默认为 true 表示 在session 过期超时前 每次访问路由 或者 接口请求，
      都会重新计算过期时间（要配合 resave:true 并且要重新设置 session 才能生效 ），
      false 表示 在session 过期超时前 无论访问多少次 都是按第一次刷新开始计时
    */
    rolling:true,
    /*
       配置 通过 connect-mongo 模块 将session 存入 MongoDB数据库中
       不同的账号 在不同的浏览器 登录后 存入数据库的也是另生成一条数据 并且生成不同的 cookie 和 session
       即使是同一个账号在不同的浏览器 登录后 存入数据库的也是另生成一条数据 并且生成不同的 cookie 和 session
    */
    store:MongoStore.create({
      //mongodb://127.0.0.1:27017/ MongoDB数据库地址  并且 新创建 一个数据库（xingxin_session 数据库名） 在存放 session
        mongoUrl: 'mongodb://127.0.0.1:27017/xingxin_session',
        ttl: 1000*60*60,// 过期时间（过期 该session自动从数据库中移除 ） - 和上面配置的 cookie 过期时间 必须保持一致
    })
  }))

/*
  设置 应用级中间件（ 没有挂载path路径的中间件（被称为 万能匹配应用中间件），案例： 30-node-express-中间件 文件夹下01-中间件-应用级中间件.js 可见
  校验 session 过期 （请求拦截器 - 在指定一些路由或者的请求之前校验 login登录页面除外 否则一直触发校验 重定向）
  否则所有的路由 或 api 请求全部一个个写校验 session不太现实
*/
app.use((req,res,next)=>{
  // 过滤 排除 不需要校验的 路由和接口请求 如：login相关的路由和接口 ，否则一直校验不通过 执行重定向
  if(req.url.includes('login')){
    // 调用 next() 直接执行 下一个中间件
    next();
    //  不执行 后面的 session 校验
    return
  }
  // 校验 session 是否过期
  if(req.session.user){
    // 每次访问路由 或者 接口 都重新设置一下 session 重新计算过期时间，在 配置的过期时间(1小时)内什么操作都没有会正常过期 防止 用户一直在操作 页面时 session 过期
    // 只要 每次让 req.session. 发生改变就行 至于后面的 myDate 是自定义的 并不是固定字段 目的只是为了 session 触发改变 重新计算过期时间。
    req.session.myDate =   Date.now(); // 赋值时间戳 每次请求 或者 访问路由  触发session改变 重新计算过期时间

    // 未过期 - 调用 next() 继续执行 下一个中间件，否则下面的无法执行
    next();
  }else{
    /*
      cookie丢失 或者 session 过期 - 重定向到 登录页

      问题：如 前端 发起一个 ajax 请求，cookie session正好是过期状态，后端校验session 过期 返回一个 重定向 到 login页，
      但是 前端发了一个ajax到后端，后端返回 重定向login页 是不好用的（前端的ajax请求，后端只能res.send返回数据），虽然后端返回了重定向login页，
      并且这个login页 也打印了（F12 在 网络 中可见）但是页面确实不会 重定向跳转login页，这是浏览器的一个限制。
      前端（客户端） ajax发给后端（服务端）的 后端让重定向 前端（客户端-浏览器）不会进行重定向，因为这个是由 前端（客户端）来主导的，后端（服务端）只能返回数据，
      前端（客户端）自己通过 window.location.href 进行跳转，如果是纯后端嵌套模板  form 提交请求过去了 ，后端才可以在请求的同时返回 重定向 到 login页，
      ajax 这种分离式的是不可以的。

      解决方案：因为当前的写法 是既有 路由 后端渲染的嵌套模板（ejs），又有 接口 ajax 请求，因此需要判断 是 接口 还是路由，
               是接口 返回数据错误码，不是ajax接口就直接重定向。
      如果是纯的 后端渲染的嵌套模板 直接重定向 就可以搞定，如果是纯 前后端分离 返回401错误码+数据 让前端执行跳转也可以搞定 就不好涉及到上面的问题
    */
    // 判断是否 是接口 因为当前接口是写 api 中 所以只需要 判断url中是否包含 api 字段就知道是不是 ajax请求接口,是接口 返回401错误码+数据 让前端跳转 否则是路由就执行重定向
    req.url.includes('api')?res.status(401).send({Code:-1,Message:'session 登录令牌已过期，请重新登录'}):res.redirect('/login')
    // res.redirect('/login')
  }
});


//  应用级中间件(挂载在 app 身上的)  ，注册 路由级中间件 indexRouter  、 usersRouter 。几级路径 说明案例 在30-node-express-中间件下的 02-中间件-路由级中间件-01.js 可见说明
app.use('/', indexRouter);// 将 路由模块 挂载在应用级中间件上 ，一级路径 访问地址： http://localhost:3000/
app.use('/api', apiRouter);// 注册 - 路由级接口 自定义封装 api接口  将 路由模块 挂载在应用级中间件上 ，一级路径 接口请求访问地址：http://localhost:3000/api
app.use('/home', HomeRouter);// 将 路由模块 挂载在应用级中间件上 ，一级路径 访问地址：http://localhost:3000/home  渲染views下的 home.ejs 模板页
app.use('/login', LoginRouter);// 将 路由模块 挂载在应用级中间件上 ，一级路径 访问地址：http://localhost:3000/login  渲染views下的 login.ejs 模板页

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
