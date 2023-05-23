/*
    02 http模块
     要使用HTTP服务器 和客户端，则必须使用 commonjs规范 导入内置http模块 如：require('http')

    启动命令 终端node命令启动 D:\project\electron\node-demo\08-node内置模块-http模块-1    ：node 01 按下TAB键
    浏览器访问 http://localhost:4399/home 4399是自己在listen中定义的 注意 端口号不要和本地已启动的其他软件重复引起冲突

*/

const http = require("http");
// 导入 自定义模块化的 方法
const moduleRenderHTML = require('./module/renderHTML');
const moduleRenderStatus = require('./module/renderStatus');
// 写法1： 创建服务器的方法 createServer() ，接收一个回调函数
// http.createServer(function (req, res) {// 接收的回调函数
//     // req是接收浏览器传的参数，res是返回渲染的内容
//     // console.log(req, res);
//     //  /favicon.ico 浏览器自动发起的请求，浏览器左侧的小图标  可以读取一个本地图片 返回显示
//     if (req.url === '/favicon.ico') {
//         // todo 读取本地图标
//         return
//     }
//     console.log(req.url);
//     // res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
//     //  根据路径信息 返回状态码200或404
//     // res.writeHead(renderStatus(req.url), { "Content-Type": "text/html; charset=utf-8" })
//     // 调用自定义 的模块
//     res.writeHead(moduleRenderStatus.renderStatus(req.url), { "Content-Type": "text/html; charset=utf-8" })
//     // req.url  获取路径信息
//     // res.write(renderHTML(req.url))
//     // 调用自定义 的模块
//     res.write(moduleRenderHTML.renderHTML(req.url))
//     // 编写返回渲染的内容
//     // res.write('hello world');
//     // 告诉浏览器写完了 ，否则浏览器一直在等待会引发超时报错
//     res.end();
// }).listen(4399, () => {
//     console.log('OK,服务器创建成功-回调');
// })

// 使用 模块化 在module文件夹内 封装 以下 2个函数
// 自定义一个处理根据url路径信息 返回函数
// const renderHTML = (url) => {
//     let text = (str) => {
//         return ` <html>
//             <body>
//                 <h4>${str}</h4>
//             </body>
//         </html>`
//     };
//     switch (url) {
//         case '/login'://例：访问页面 返回html字符串
//             return text('login-页')
//         case '/home':
//             return text('home-页')
//         case '/list':
//             return text('list-页')
//         case '/api/home'://例：访问api接口 返回JSON字符串数据
//             return `{name:'xiaoming'}`
//         case '/api/list':
//             return `["list1","list2","list3",]`

//         default:
//             return text('404 no found')
//     }

// }
// 根据路径信息 返回状态码200或404
// const renderStatus = (url) => {
//     const arr = ['/login', '/home', '/list','/api/home','/api/list'];
//     //当前url 路径 arr中是否包含
//     return arr.includes(url) ? 200 : 404;
// }

// 写法2：同上方的写法1是等价的
// 创建服务器的方法 createServer()
const server = http.createServer();
// 监听请求事件 每次请求过来时触发
server.on('request',(req,res)=>{
    // req是接收浏览器传的参数，res是返回渲染的内容
    // console.log(req, res);
    //  /favicon.ico 浏览器自动发起的请求，浏览器左侧的小图标  可以读取一个本地图片 返回显示
    if (req.url === '/favicon.ico') {
        // todo 读取本地图标
        return
    }
//     console.log(req.url);
    // res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    //  根据路径信息 返回状态码200或404
    // res.writeHead(renderStatus(req.url), { "Content-Type": "text/html; charset=utf-8" })
    // 调用自定义 的模块
    res.writeHead(moduleRenderStatus.renderStatus(req.url), { "Content-Type": "text/html; charset=utf-8" })
    // req.url  获取路径信息
    // res.write(renderHTML(req.url))
    // 调用自定义 的模块
    res.write(moduleRenderHTML.renderHTML(req.url))
    // 编写返回渲染的内容
    // res.write('hello world');
    // 告诉浏览器写完了 ，否则浏览器一直在等待会引发超时报错
    res.end();
})
// 监听服务器端口号 创建好的返回回调
server.listen(4399,()=>{
    console.log('OK,服务器创建成功-回调');
})