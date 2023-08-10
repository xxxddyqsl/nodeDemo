/*
    基于 - 30-node-express-中间件 学习目录的补充
    内置中间件-介绍：
    express.static() 是 Express 唯一的内置中间件。它是基于 serve-static，负责在 Express 应用中提托静态资源，
    每个应用可有多个静态资源目录。

    通过 Express 内置 express.static() 可以方便的托管静态文件，例如图片、css、JavaScript文件等。
    将静态资源文件所在的目录
*/
const express = require('express');
const app = express();
// 导入 封装的路由级中间件 home分支路由模块 根据不同分支 单独写 路由模块 多个接口模块的体现
const HomeRouter = require('./router/homeRouter');
const LoginRouter = require('./router/LoginRouter');
/*
    如想指定 当前文件夹下有 public 文件夹 为静态资源文件夹
    如：27-node-路由-静态资源 中将 static 文件夹打造成静态资源文件目录 在StaticFiles.js 文件中 
    使用了：//静态资源管理
            const fs = require('fs');//读取文件
            // 处理文件路径
            const path = require('path');
            // 安装第三方 mime 模块 根据 文件扩展名 返回对应的 Content-Type 类型值 让浏览器解析
            const mime = require('mime')
        等等，具体案例 27-node-路由-静态资源文件夹中可见


    而通过express提供的内置中间件 只需要一段代码 就可以迅速将 一个目录 打造成静态资源文件目录如：
    app.use(express.static('public'));  配置静态资源目录 - 中间件 通过express下的static()方法 传入文件夹名

    可以设置多个 静态资源文件夹
*/
/*
    注意：所有文件的路径都是相对于存放目录的，因此存放静态文件的目录名不会出现在URL（访问的地址路径）中 如下：

    访问 http://localhost:4399/login.html 路径不需要加public 即可访问到  public下的login.html文件
    包括 login.html 内部引入的 login.css 文件也是会被处理返回 静态css资源
    该 public或uploads  静态资源文件目录 配置中间件时没有设置 path路径 因此指向的是在 http://localhost:4399 下
*/
app.use(express.static('public'));//访问 http://localhost:4399/login.html 路径不需要加 public 即可访问到  public 下的login.html文件 或者 http://localhost:4399/css/login.css访问该静态文件目录下的css文件
//   可以设置多个 静态资源文件夹
app.use(express.static('uploads'));

/*
    当然如果你希望所有通过 express.static('static') 访问的文件都存放在一个"虚拟(virtual)"目录(即目录根本不存在)下面,
    可以通过为静态资源目录指定一个挂载路径的方式来实现,如下所示:
    '/static' 可自定义命名 只是访问的地址需要一致 如：http://localhost:4399/static/list.html 才能访问到 该中间件设置的静态资源文件404.html或者http://localhost:4399/static/image/favicon.ico等等
    app.use('/static',express.static('static'));因为设置path路径 需要加上 /static 才可访问到
    该static静态资源文件目录 配置中间件时设置了 path路径  指向的是在 http://localhost:4399/static 下
*/
app.use('/static',express.static('static'));//访问 http://localhost:4399/static/list.html 路径 因为设置path路径 需要加上 /static 才可访问到  static 下的list.html文件


//  配置解析 POST 请求参数的 中间件 - 已经内置了 - 案例 详情在 31-node-express-获取请求参数文件夹中可见

/*  配置解析 POST 请求参数的 中间件 - 处理post 请求参数 - form编码格式*/
app.use(express.urlencoded({extended:false}));//解析 post 请求参数 -格式为 form 编码的格式 如：usename=小明&password=123456

// 配置解析 POST 请求参数的 中间件 - json格式
app.use(express.json());//解析 post请求 - 参数格式为 JSON字符串的格式 如：JSON.stringify({usename:'小明',password:'123456'})

// 当前上面代码配置(form 编码的格式 + json 格式) post 解析请求参数的两格式中间件，因此当前支持 前端 form编码格式+json格式的 两种post请求解析参数


//  应用级中间件(挂载在 app 身上的) -> app.use()注册 应用级中间件 无path路径 默认所有请求都会执行 万能匹配
app.use((req, res, next) => {
    console.log('应用级中间件==> 验证 token');
    // 可通过 next 给下一个中间件 传入参数 如 let a= {name:'测试参数'}; next(a); 具体案例 03-中间件-错误中间件.js 空间
    next();
});


app.use('/home', HomeRouter);
app.use('/login', LoginRouter);

// 错误中间件 - 写法1：
app.use((req, res, next) => {
    res.status(404).send('404 Not Found,访问的页面丢失了')
});
// 启动服务器 - 监听 端口号 接收一个回调函数, 服务器创建成功时 就会调用
app.listen(4399, () => {
    console.log('OK,服务器创建成功-回调');
});