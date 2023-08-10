/*
    内置中间件-介绍：
    express.static() 是 Express 唯一的内置中间件。它是基于 serve-static，负责在 Express 应用中提托静态资源，
    每个应用可有多个静态资源目录。
*/
const express = require('express');
const app = express();
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
    app.use(express.static('public'));

    待补充，未学习完

    学习补充 在 - 32-node-express-托管静态资源文件 可见学习案例
*/

/*
    注意：所有文件的路径都是相对于存放目录的，因此存放静态文件的目录名不会出现在URL（访问的地址路径）中 如下：

   //访问 http://localhost:4399/test1.html URL路径不需要加 public 即可访问到  public 下的 test1.html文件
    包括 test1.html 如果内部引入的 test1.css 文件也是会被处理返回 静态css资源
*/
app.use(express.static('public'));//访问 http://localhost:4399/test1.html URL路径不需要加 public 即可访问到  public 下的 test1.html文件
// 可以设置多个 静态资源文件目录
app.use(express.static('uploads'));

// 访问静态资源文件时，express.static(); 中间件会根据目录添加的顺序查找所需的文件。

/*
    当然如果你希望所有通过 express.static('static') 访问的文件都存放在一个"虚拟(virtual)"目录(即目录根本不存在)下面,
    可以通过为静态资源目录指定一个挂载路径的方式来实现,如下所示:
    '/static' 可自定义命名 只是访问的地址需要一致 如：http://localhost:4399/static/404.html 才能访问到 该中间件设置的静态资源文件404.html或者http://localhost:4399/static/favicon.ico等等
    app.use('/static',express.static('static'));
*/

app.use('/static',express.static('static'));//访问 http://localhost:4399/static/404.html 路径 因为设置path路径 需要加上 /static 才可访问到  static 下的 404.html文件





// 启动服务器 - 监听 端口号 接收一个回调函数, 服务器创建成功时 就会调用
app.listen(4399, () => {
    console.log('OK,服务器创建成功-回调');
});