/*
    中间件 ：
        Express 是一个自身功能极简，完全是由路由和中间件构成一个的web开发框架，从本质上来说，一个express应用就是在调用各种中间件。

        中间件（Middleware）是一个函数，它可以访问 请求对象（ request object(req)，解释：req就是 请求对象 前端带来的内容 ）,
        响应对象 （response object(res) 解释：res 就是响应对象 给前端返回的内容）和 web应用中处于请求-响应循环流程中的中间件，
        一般被命名为 next 的变量。

        中间件的功能包括：
            1：执行任何代码。
            2：修改请求和响应对象。
            3：终结请求-响应循环。
            4：调用堆栈中的下一个中间件。

        如果当前中间件没有 终结请求-响应循环，则必须调用 next() 方法将控制器交给下一个中间件，否则请求就会挂起。

        Express 应用可使用如下几种中间件：
            1：应用级中间件（凡是挂载在app对象上的都是应用级中间件 如 app.get('/', [callback]); app.get('/login', [callback]); app.get('/home', [callback]); 等等写了path 匹配路径的都是应用级中间件 而app.use(function (req, res, next) {})没有写path路径的也是应用级中间件被称为万能匹配  ）。
            2：路由级中间件。
            3：错误处理中间件。
            4：内置中间件。
            5：第三方中间件。

        使用可选则挂载路径，可在应用级别或路由级别装载中间件，另外，你还可以同时装在一系列中间件函数，从而在一个挂载点上创建一个中间件栈。

        （1）应用级中间件 -  应用级中间件绑定到 app 对象上 任何请求过来 都会响应 走这个中间件
        应用级中间件绑定到 app 对象，使用app.use() 和 app.METHOD(),其中，METHOD 是需要处理的 HTTP 请求的方法，如 GET，POST，PUT 等等，全部小写，
        并且是有执行顺序的 如果在执行 app.use(function (req, res, next) {})  前执行了app.get('/', [callback]); url 匹配到了 '/' 是不会触发 应用级中间件的app.use(function (req, res, next) {})。

        注意：如下案例逻辑 app.use(function (req, res, next) { console.log('验证 token + 验证 cookie');}) 放在最前面，
         那在login登录的时候 就会验证 token + 验证 cookie，但是此时还没有登录肯定没有有效的 token 那就会永远都是出错的，因此使用app.use() 注册中间件 需要注意 场景 和 执行的顺序


        应用级中间件 与 路由级别中间件 的区别：
    1：应用级中间件是挂载在 app 身上的 如: app.use()  app.get()
    2：路由级中间件 是挂载在绑定 在 express.Router() 身上的
*/
const express = require('express');
const app = express();
// 导入 封装的路由级中间件
const indexRouter = require('./router01/indexRouter-01');
function init() {
    //  应用级中间件(挂载在 app 身上的) -> app.use()注册 应用级中间件 无path路径 万能匹配 当然也可以挂载了path路径 如：app.use('/home',function (req, res, next) {}) 
    app.use(function (req, res, next) {
        console.log('应用级中间件==> 验证 token');
        next();
    });
    /*
        应用级中间件(挂载在 app 身上的) -> app.use('/',路由模块)注册 路由级中间件 ，
        app.use('/', indexRouter); path路径为'/' 匹配到'/'路径 可以控制一级匹配
        一级匹配 :如访问 http://localhost:4399/home

        app.use('/api', indexRouter);  path路径为'/api' 匹配到'/api'路径 可以控制二级匹配
        也可以写成二级匹配 :如访问 http://localhost:4399/api/home

        甚至可以写成 三级 四级 等等 需满足 匹配的 path路径 如：app.use('/api/b', indexRouter) 访问 http://localhost:4399/api/b/home 等等

        匹配到path路径 就会走到封装的 indexRouter 路由级中间件

        写法1：如下
    */
    app.use('/', indexRouter);// 将 路由模块 挂载在应用级中间件上
    // 启动服务器 - 监听 端口号 接收一个回调函数, 服务器创建成功时 就会调用
    app.listen(4399, () => {
        console.log('OK,服务器创建成功-回调');
    });
}
// 导出 方式1：
// exports.init = init;
// 导出 方式2：
module.exports = init;