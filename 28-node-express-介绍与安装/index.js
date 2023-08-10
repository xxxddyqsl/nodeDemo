/*
       express-介绍与安装
       官网地址：https://www.expressjs.com.cn/
       介绍：
           基于node.js平台，快速、开放、极简的web开发框架。
       1：特色
       1：web应用
           Express 是一个基于node.js平台极简的、灵活的web应用开发框架，它提供一系列强大的特效，帮助你创建各种web和移动设备应用。
           Express 是一个保持最小规模的灵活的 Node.js Web 应用程序开发框架，为 Web 和移动应用程序提供一组强大的功能。
       2：API
           丰富的HTTP快捷方法和任意排列组合的 Connect 中间件，让你创建 健壮，友好的API变得既快速又简单。
           使用您所选择的各种 HTTP 实用工具和中间件，快速方便地创建强大的 API
       3：性能
           Express 不对 node.js已有的特性进行二次抽象，我们只是在它之上扩展了web应用所需的基本功能。
           Express 提供精简的基本 Web 应用程序功能，而不会隐藏您了解和青睐的 Node.js 功能。
       4：框架
           许多 流行的开发框架 都基于 Express 构建。

       安装命令：
           yarn init
           yarn add express
*/
// 导入 express
const express = require('express');
const fs = require('fs');
// express 是一个函数 通过执行 得到一个 app 实例 可以通过这个app实例注册中间件等
const app = express();
/*
    最简单的代码 - 通过app 创建一个服务器 创建服务器的方法

    app.get('/',(req,res)=>{}))：
    第一个参数 字符串（要匹配的路径）   '/' 访问的路径  如 http://localhost:4399/  通过new url()的 pathname 解析路径返回的就是'/' （ 文件夹 -  27-node-路由-静态资源中有案例 ）
    第二 个参数 回调函数 // req是接收浏览器传的参数，res是返回渲染的内容


    感觉 http.createServer有点 类似 只是 app 更加强大 进行了二次封装
*/
// 之前是需要手写路由去匹配 url的路径 现在只需要 app.get中在第一个参数写下访问 路径就可以
app.get('/',(req,res)=>{ // 访问的url地址为http://localhost:4399/
    // 方式1：使用原来的方式：
    // 给浏览器传输 内容
    // res.write('hello world');
    // 告诉浏览器 传输结束
    // res.end();

    // 方式2：使用  express 进行了二次封装的 res.send() 方式：
    // 这里的 req , res 和  之前学习的 http.createServer 返回的 是一样的 区别 在于 express 中进行了一些二次 封装 如下：

    /*
        这里的 res.send() 是类似将 res.write() 和 res.end() 进行了统一的封装 ，一个 res.send()就可以代替之前的  res.write 和 res.end。

        同时 之前要往前端返回一个 api接口数据、html代码片断、文件等，需要先设置头部信息 告诉浏览器 按什么格式解析 传输过去内容 如：  res.writeHead(status, // 设置头部 状态码 { "Content-Type": `${type?type:'text/html'};charset=utf-8`});
        如：  api接口数据（设置头部信息'Content-Type':'application/json; charset=utf-8'）、
        html代码片断（设置头部信息'Content-Type':'text/html; charset=utf-8'）、 文件等 。

        而res.send() 可以直接写入 代码片断 如： res.send(`<html><h1>hello world</h1></html>`); , 如读取文件 res.send(fs.readFileSync('./index.html').toString('utf-8'));等
        不需要像之前一样 设置 头部信息 告诉浏览器 按什么格式解析 传输过去内容
          res.writeHead(status, // 设置头部 状态码
        { "Content-Type": `${type?type:'text/html'};charset=utf-8`});

    */
    // try {
    //     //例1： readFileSync 同步读取文件 Buffer 二进制数据 转为  utf-8格式
    //     let str = fs.readFileSync('./index.html').toString('utf-8');
    //     // 模拟 html代码片断
    //     // res.send(`<html><h1>hello world</h1></html>`)
    //     console.log(str);
    //     res.send(str);
    // } catch (error) {
    //     console.log(error);
    // }
    //例2： 模拟 api 接口 直接返回一个对象数据 - 不设置头部 传入数据不为字符串
    /*
        之前写法：
        设置头部res.writeHead(200, // 状态码 application/json 调用接口时的格式  { "Content-Type": `application/json;charset=utf-8` });
        传输的内容 res.write(`{"Code":0,"data":{"message":"login登录成功"}}`);res.end();

        同时传入的数据必须是一个 字符串 如：`{"Code":0,"data":{"message":"login登录成功"}}`
    */
    // 现在直接传一个对象 未进行任何的修饰 或 转为 字符串
     res.send({Code:0,data:{message:"login登录成功"}});

});

app.get('/login',(req,res)=>{ // 访问的url地址为http://localhost:4399/login
    // 给浏览器传输 内容
    res.write('login');
    // 告诉浏览器 传输结束
    res.end();
});
// 启动服务器 -  监听 端口号 接收一个回调函数, 服务器创建成功时 就会调用
app.listen(4399,()=>{
    console.log('OK,服务器创建成功-回调')
})

