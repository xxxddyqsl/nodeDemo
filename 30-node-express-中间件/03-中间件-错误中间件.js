/*
    与 02-中间件-路由级中间件-01.js 不同的是 当前路由模块根据不同分支 单独写 路由模块 ,优点 代码更清晰 后期维护更方便

    应用级中间件 与 路由级别中间件 的区别：
    1：应用级中间件是挂载在 app 身上的 如: app.use()  app.get()
    2：路由级中间件 是挂载在绑定 在 express.Router() 身上的

*/
const express = require('express');
const app = express();
function init() {
    //  应用级中间件(挂载在 app 身上的) -> app.use()注册 应用级中间件 无path路径 默认所有请求都会执行 万能匹配
   

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
    app.get('/login', (req,res)=>{
        res.send('/login')
    });
    app.get('/home',(req,res)=>{
        res.send('/home')
    });
    // 错误中间件 - 写法方式1：
    // app.use((req, res, next) =>{
    //     // 默认的错误提示：Cannot GET /dddd  覆盖默认的错误提示
    //     res.status(404).send('访问的页面丢失了');
    // });
     // 错误中间件 - 写法方式2：可使用第三方库 获取错误  通过 next(err) 传入 err 参数给下一个错误中间件调用
     app.use((req, res, next) =>{
        /*
            上面的 api 接口全部没有匹配到 通过  app.use  无path路径 默认所有请求都会执行 为万能匹配，
            并且 通过 next(err) 传入 err 参数 给下一个中间件调用，可以通过使用'http-errors' 第三方库    获取错误
            当前是写死错误信息 模拟匹配不到 直接返回 404
        */
        var err = new Error('');
        err.status = 404;
        err.msg ='404,Not Found,访问的页面丢失了'
        next(err);
    });
    /*
        上一个  app.use((req, res, next) =>{}) 应用级中间件  通过 next(err) 传入了 err  参数
        错误中间件 (应用级中间件) - 代码执行放在末尾 （ 此 app.use((req,res)=>{}) 无path路径 默认所有请求都会执行 为万能匹配 ）
        如果 错误中间件 代码放在前面 那即使是 存在的 能匹配到的路由（如'/home'） 或 api 接口 也是会先进入 错误中间件会直接返回 代码不在继续匹配往下走。

        因此 错误中间件 放在最后 只有前面的全部匹配本不到 才会执行 错误中间件，并且是直接返回  设置状态码：404 和 自定义的错误提示。
        并且 错误中间件的 4个参数 必须全部写出来，即按顺序： err, req, res, next ，不管你后面的参数是否要使用，都要写出来，才能正常访问 传入的 err 变量参数
    */
    app.use((err, req, res, next)=>{
        // 具体错误的状态码
        console.log(err,err.status)
        let errHtml = (message) => {
            return `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Document</title>
                        <style>
                            html,body{
                                margin: 0;
                                padding: 0;
                                width:100%;
                                height:100%;
                            }
                            .gg-flex-1 {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                            .gg-flex-2 {
                                flex-direction: column;
                            }
                            .gg-flex-3 {
                                display: flex;
                                align-items: center;
                                justify-content: flex-start;
                            }
                            .gg-flex-4 {
                                display: flex;
                                align-items: flex-start;
                                justify-content: flex-start;
                            }
                            .wrap{
                                width:100%;
                                height:100%;
                            }
                        </style>
                    </head>
                    <body>
                    <div class="wrap gg-flex-1 gg-flex-2" >
                        <h1 style='text-align: center;'> ${message}</h1>
                    </div>
                    </body>
                    </html>`;
        };
        // 默认的错误提示：Cannot GET /dddd  覆盖默认的错误提示
        // res.status(404).send('访问的页面丢失了');
        res.status(err.status).send(errHtml(err.msg));

    })
    // 启动服务器 - 监听 端口号 接收一个回调函数, 服务器创建成功时 就会调用
    app.listen(4399, () => {
        console.log('OK,服务器创建成功-回调');
    });
}
// 导出 方式1：
// exports.init = init;
// 导出 方式2：
module.exports = init;