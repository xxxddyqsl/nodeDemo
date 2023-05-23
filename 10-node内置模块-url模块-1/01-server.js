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
        参数1:传入url解析url路径信息
        参数2:Boolean，传true 将 解析出来的url后跟着的参数 转为json数据 如：
        query: [Object: null prototype] { id: '111', name: 'cc' }
        默认为字符串 query: 'id=111&name=cc',

        pathname 解析出来的 路径 如'/api/home' ，'/home' 等
        query 解析出来的url后跟着的参数
    */
   
    const { pathname,query } = url.parse(req.url,true);
    console.log(url.parse(req.url,true),query.id,query.name);
    // res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    //  根据路径信息 返回状态码200或404
    // res.writeHead(renderStatus(req.url), { "Content-Type": "text/html; charset=utf-8" })
    // 调用自定义 的模块
    res.writeHead(moduleRenderStatus.renderStatus(pathname), { "Content-Type": "text/html; charset=utf-8" })
    // req.url  获取路径信息
    // res.write(renderHTML(req.url))
    // 调用自定义 的模块
    res.write(moduleRenderHTML.renderHTML(pathname))
    // 编写返回渲染的内容
    // res.write('hello world');
    // 告诉浏览器写完了 ，否则浏览器一直在等待会引发超时报错
    res.end();
})
// 监听服务器端口号 创建好的返回回调
server.listen(4399,()=>{
    console.log('OK,服务器创建成功-回调');
})
//url.format() 通过 url模块内的 format 函数 将对象结构数据 拼接成完整的 域名地址信息
var obj_url={
    protocol: 'https',
    slashes: true,
    auth: null,
    host: 'www.bilibili.com',
    port: null,
    hostname: 'www.bilibili.com',
    hash: null,
    search: '?p=12&spm_id_from=pageDriver&vd_source=0bf9d806a056be53cb6b8e1a62156965',
    query:'p=12&spm_id_from=pageDriver&vd_source=0bf9d806a056be53cb6b8e1a62156965',
    pathname: '/video/BV1rA4y1Z7fd/',
    path: '/video/BV1rA4y1Z7fd/?p=12&spm_id_from=pageDriver&vd_source=0bf9d806a056be53cb6b8e1a62156965',
    href: '/video/BV1rA4y1Z7fd/?p=12&spm_id_from=pageDriver&vd_source=0bf9d806a056be53cb6b8e1a62156965'
  }
  console.log('format函数=>',url.format(obj_url));

/*
   url.resolve 通过 url模块内的 resolve 函数 进行 url的地址拼接

    1：注意  前面一段路径 最后 加/,不加/的区别
    1-加/ ：如 three 后面加/ url.resolve('/one/two/three/','four') ，拼接的地址为 /one/two/three/four
    1-不加/ ：如 three 后面不加/ url.resolve('/one/two/three','four') ，拼接的地址为 /one/two/four 会替换掉 three

    2：后面还有一段路径'/two'加/时， 前一段不管有没有加/ 前一段路径都会被替换一直到域名为止

    除 如域名http://example.com这种 纯粹的路径 加/（路径会连起来）,不加/（前面一段路径的最后一个替换掉）的区别
*/
// 如 前面一段路径'/one/two/three'  后面还有一段路径'four' 但是前面一段路径最后一个three 后没有加/ 所以three会被替换 打印为 /one/two/four
var a = url.resolve('/one/two/three','four');  //注意前面一段路径最后一个three 最后 加/,不加/的区别
// / 如 前面一段域名 'http://example.com  后面还有一段路径'one'
var b = url.resolve('http://example.com','one'); 
var c = url.resolve('http://example.com/one/','/two'); //  后面还有一段路径'/two'加/ 前一段不管有没有加/ 前一段路径都会被替换一直到域名为止  注意最后 加/,不加/的区别

console.log('A:前面一段路径最后一个three 后没有加/ 被four替换掉:'+a);
console.log('B:只有域名加/不加/ 拼接不影响:'+b);
console.log("C:后面还有一段路径'/two'加/时， 前一段不管有没有加/ 前一段路径都会被替换一直到域名为止:"+c);