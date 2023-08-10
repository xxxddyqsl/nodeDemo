const http = require('http');
const url = require('url');
const querystring = require('querystring');
//允许访问的域名 - 目前 'http://172.18.70.26:8088' ip地址访问无效
const arrDomain=['http://127.0.0.1:5500','http://172.18.70.26:8088','http://localhost:8088']
http.createServer((req, res) => {
    var urlObject = url.parse(req.url, true);
    console.log(urlObject)

//    if(arrDomain.includes(req.headers.origin)){
    console.log('arrDomain===>', req.headers,req.headers.origin)
//    }
    switch (urlObject.pathname) {
        case '/api/use':
            /*
                响应头中writeHead() 设置 Content-Type：
                "Content-Type":"text/html; charset=utf-8" 浏览器会当做html 来加载展示
                "Content-Type":"text/plain" 浏览器会当做普通的文本 来加载展示
                "access-control-allow-origin":"*" //设置允许跨域的域名，*代表允许任意域名跨域
            */
            //  设置响应头: writeHead() 响应正文write()
            res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",//返回的为 json 数据
                // 设置 cors 头
                //"access-control-allow-origin": "*",//设置允许跨域的域名，*代表允许任意域名跨域
                //"access-control-allow-origin": "http://127.0.0.1:5500",//设置允许指定跨域的域名，*代表允许任意域名跨域
                "access-control-allow-origin": arrDomain.includes(req.headers.origin)?req.headers.origin:"",//设置允许多个跨域的域名，*代表允许任意域名跨域
            })
            // 告诉浏览器写完了 ，并且 返回一个 JSON字符串或html字符串
            res.end(`${JSON.stringify({ name: 'xiaoming', age: 18, city: '北京' })}`);
            break;
        default:
            res.end('404');
            break;
    }

}).listen(4399, () => {
    console.log('OK,服务器创建成功-回调');
});