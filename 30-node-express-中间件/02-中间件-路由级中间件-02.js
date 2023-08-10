/*
    与 02-中间件-路由级中间件-01.js 不同的是 当前路由模块根据不同分支 单独写 路由模块 ,优点 代码更清晰 后期维护更方便

    应用级中间件 与 路由级别中间件 的区别：
    1：应用级中间件是挂载在 app 身上的 如: app.use()  app.get()
    2：路由级中间件 是挂载在绑定 在 express.Router() 身上的

*/
const express = require('express');
const app = express();
// 导入 封装的路由级中间件 home分支路由模块 根据不同分支 单独写 路由模块 多个接口模块的体现
// const HomeRouter = require('./router02/HomeRouter');
const HomeRouter = require('./router02/homeRouter');
const LoginRouter = require('./router02/LoginRouter');
function init() {
    //  应用级中间件(挂载在 app 身上的) -> app.use()注册 应用级中间件 无path路径 默认所有请求都会执行 万能匹配
    app.use( (req, res, next) =>{
        console.log('应用级中间件==> 验证 token');
        // 可通过 next 给下一个中间件 传入参数 如 let a= {name:'测试参数'}; next(a); 具体案例 03-中间件-错误中间件.js 空间
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

        写法2： 根据不同分支 单独写 路由模块 如下：   app.use('/home', HomeRouter);   app.use('/login', HomeRouter);等等
    */
    /*
        根据不同分支 单独写 路由模块 多个接口模块的体现。
        应用级中间件此处 app.use('/home', HomeRouter); '/home' 为一级匹配，

        想要在匹配到'/home' 就可以返回东西 那在路由中间件中 path路径 要写成'/' 需要二级路径没有东西才能 匹配到 '/home'如下：
        router.get('/',(req,res)=>{  res.send('/home');}); 访问  http://localhost:4399/home 即可

        如果在 路由中间件中 二级路径 path 在写一个'/home' 如： router.get('/home',(req,res)=>{  res.send('/home/home');}); 那就是  http://localhost:4399/home/home 才能访问到返回东西，
        但是这就不符合 访问http://localhost:4399/home 匹配到'/home' 就返回东西的需求

        总结：先匹配 应用级中间件的path路径（'/home'）一级路径匹配 app.use('/home', HomeRouter); 然后进入 路由中间件 匹配 path路径进行二级路径匹配 ，以此类推.

    */
    app.use('/home', HomeRouter);
    app.use('/login', LoginRouter);


    // 启动服务器 - 监听 端口号 接收一个回调函数, 服务器创建成功时 就会调用
    app.listen(4399, () => {
        console.log('OK,服务器创建成功-回调');
    });
}
// 导出 方式1：
// exports.init = init;
// 导出 方式2：
module.exports = init;