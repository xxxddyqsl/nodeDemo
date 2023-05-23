/*
    01 http模块 - 最简单的使用
    要使用HTTP服务器 和客户端，则必须使用 commonjs规范 导入内置http模块 如：require('http')

    启动命令 终端node命令启动 D:\project\electron\node-demo\08-node内置模块-http模块-1    ：node 01 按下TAB键
    浏览器访问 http://localhost:4399 4399是自己在listen中定义的 注意 端口号不要和本地已启动的其他软件重复引起冲突
*/
const http = require('http')

// 创建服务器的方法 createServer() ，接收一个回调函数
http.createServer((req, res) => { // 接收的回调函数
    // req是接收浏览器传的参数，res是返回渲染的内容
    console.log(req, res)
    // write()方法表示给浏览器写东西 write()方法可写多个 如下：给浏览器发送 一段字符串
    // res.write(' hello world - 11 ');
    // res.write(`hello world - 222`);

    /*
        返回一个html格式的内容

    */
    /*
        响应头中writeHead() 设置 Content-Type：
        "Content-Type":"text/html; charset=utf-8" 浏览器会当做html 来加载展示
        "Content-Type":"text/plain" 浏览器会当做普通的文本 来加载展示
    */
    //    响应头: writeHead() 响应正文write()
     res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}); //200是响应的状态码
    // res.writeHead(200, { "Content-Type": "text/plain" }); //浏览器会当做普通的文本 来加载展示
    var htmlHead = `<head> <meta>charset="UTF-8"</meta></head>`;
    res.write(`
        <html>
        ${htmlHead}
            <body>
                <b>hello world</>
                <br/>
                <h4>方式1：需要在head 里加上 meta charset="UTF-8" 否则返回的 html 中文会乱码</h4>
                <h4>方式1：也可以在响应头中 设置 "Content-Type":"text/html; charset=utf-8" 浏览器会当做html 来加载展示</>
                <div>测试-</div>
            </body>
        </html>
    `);
    /*
        必须有end()方法表示告诉浏览器 已经写完了 通信结束了 否则浏览器会以为还在通信 导致浏览器显示超时
        也可以在 end()方法中返回渲染的内容 如: res.end('[1,2,3,]')
    */

    res.end();//告诉浏览器 已经写完
    // res.end('[1,2,3,]');
    /*
     注： 在res.end()方法之后 已经end()结束了 不可以再次执行res.write(' hello world - 33 ');给浏览器写东西 ，否则会报错
     如下
    */
    //  res.write(' hello world - 33 ');//报错Error [ERR_STREAM_WRITE_AFTER_END]: write after end
}).listen(4399, () => {//接收一个回调函数, 服务器创建成功时 就会调用
    console.log('OK,服务器创建成功')
})// listen 监听端口号 4399