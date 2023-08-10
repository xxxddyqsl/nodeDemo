const http = require('http');
const url = require('url')
// 创建服务器 createServer()
const server = http.createServer();
// 接口： jsonp
server.on('request', (req, res) => {// 监听请求事件 每次请求过来时触发
    // 访问测试地址： http://localhost:4399/api/use?callback=getuseinfo&id=xiaoming
    var urlObject = url.parse(req.url, true);
    // 获取 前端定义好 传入的匿名函数名
    var urlCallback = urlObject.query.callback
    console.log(urlObject)
    switch (urlObject.pathname) {
        case '/api/use':
            /*
                响应头中writeHead() 设置 Content-Type：
                "Content-Type":"text/html; charset=utf-8" 浏览器会当做html 来加载展示
                "Content-Type":"text/plain" 浏览器会当做普通的文本 来加载展示
            */
            //    响应头: writeHead() 响应正文write()
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
            // 告诉浏览器写完了 ，并且 返回一个 JSON字符串或html字符串 - 调用传入前端定义好的匿名函数名 并传参
            res.end(`${urlCallback}(${JSON.stringify({ name: 'xiaoming', age: 18, city: '北京' })})`);
            break;
        default:
            res.end('404');
            break;
    }
});
// 监听服务器端口号 创建好的返回回调
server.listen(4399, () => {
    console.log('OK,服务器创建成功-回调');
})