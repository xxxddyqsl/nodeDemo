/*
    03 url模块-解析浏览器传的参数
    全局安装 nodemon@2.0.20（或安装 node-dev 也可以） 热部署 修改完代码保存自动重启 node服务器
    全局安装命令 yarn global add nodemon  （或安装 node-dev,命令： yarn global add node-dev）
    使用nodemon 命令启动服务器
    nodemon 01 按下TAB键 （ 安装 node-dev,启动命令： node-dev 01 按下TAB键 ）

    启动命令 终端node命令启动 D:\project\electron\node-demo\08-node内置模块-http模块-1   ： nodemon 01 按下TAB键

    浏览器访问 http://localhost:4399/home 4399是自己在listen中定义的 注意 端口号不要和本地已启动的其他软件重复引起冲突

*/
// 导入node 内置URL模块
const url = require("url");
const http = require("http");
//fileURLToPath 函数 可确保正确解码百分比编码字符，并确保跨平台有效的绝对路径字符串。
// pathToFileURL 函数 函数确保 path 被绝对解析，并且在转换为文件网址时正确编码网址控制字符。
// urlToHttpOptions 函数 实用函数按照 http.request() 和 https.request() API 的预期将网址对象转换为普通选项对象。
const { fileURLToPath,pathToFileURL ,urlToHttpOptions } = require('url');
// 导入 自定义模块化的 方法
const moduleRenderHTML = require('./module/renderHTML');
const moduleRenderStatus = require('./module/renderStatus');
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
    /*
        访问的服务器的地址为：http://localhost:4399/api/home?id=111&name=cc

        node内置url模块 parse(url,Boolean) 方法：
        参数1: 类似为 string， 传入url解析url路径信息
        参数2: 类似为Boolean， 传true 将 解析出来的url后跟着的参数 转为json数据 如：
        属性query: [Object: null prototype] { id: '111', name: 'cc' }
        默认为字符串 query: 'id=111&name=cc',

        pathname 解析出来的 路径 如'/api/home' ，'/home' 等
        query 解析出来的url后跟着的参数
    */
    // const { pathname,query } = url.parse(req.url,true);
    // console.log(url.parse(req.url,true),query.id,query.name);
    const myURL = new URL(req.url,'http://localhost:4399/');
    /*
        获取 url后的参数 返回URLSearchParams对象 （可以通过迭代器循环取出里面的值，返回的值类型为数组 ）如下使用方法：
    */
    //  obj 为数组
    // for(let obj of myURL.searchParams){console.log(obj)}
    // 可通过 es6的解构  获取 obj 为数组内的值
    for(let [key,value] of myURL.searchParams){
        console.log('searchParams==>',key,value);
    }
    // 也可以 通过myURL.searchParams.get() 方法 获取指定的参数 返回
    // console.log(myURL.searchParams.get('id'));
    console.log(myURL);
    // res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    //  根据路径信息 返回状态码200或404
    // res.writeHead(renderStatus(req.url), { "Content-Type": "text/html; charset=utf-8" })
    
        /*
        响应头中writeHead() 设置 Content-Type：
        "Content-Type":"text/html; charset=utf-8" 浏览器会当做html 来加载展示
        "Content-Type":"text/plain" 浏览器会当做普通的文本 来加载展示
    */
    //    响应头: writeHead() 响应正文write()
    // 调用自定义 的模块
    res.writeHead(moduleRenderStatus.renderStatus(myURL.pathname), { "Content-Type": "text/html; charset=utf-8" })
    // req.url  获取路径信息
    // res.write(renderHTML(req.url))
    // 调用自定义 的模块
    res.write(moduleRenderHTML.renderHTML(myURL.pathname))
    // 编写返回渲染的内容
    // res.write('hello world');
    // 告诉浏览器写完了 ，否则浏览器一直在等待会引发超时报错
    res.end();
})
// 监听服务器端口号 创建好的返回回调
server.listen(4399,()=>{
    console.log('OK,服务器创建成功-回调');
})

//fileURLToPath 函数 可确保正确解码百分比编码字符，并确保跨平台有效的绝对路径字符串。
//路径 被编码 明显不是 window 下的路径
console.log(new URL('file://c://你好.txt').pathname);      // 错误: /%E4%BD%A0%E5%A5%BD.txt
console.log(fileURLToPath('file://c://你好.txt')); // 正确: /你好.txt (POSIX)
// pathToFileURL 函数确保 path 被绝对解析，并且在转换为文件网址时正确编码网址控制字符。
console.log(new URL('/foo#1', 'file:'));           // 错误: file:///foo#1
console.log(pathToFileURL('/foo#1'));              // 正确: file:///foo%231 (POSIX)
// urlToHttpOptions(url) 函数 参数url为要转换为选项对象的 WHATWG 网址对象。函数按照 http.request() 和 https.request() API 的预期将网址对象转换为普通选项对象。
const myURL2 = new URL('https://a:b@測試?abc#foo');

console.log(urlToHttpOptions(myURL2));