/*
    处理服务端 静态资源或读取大文件 时可用
*/

const http = require('http');
const fs = require('fs');
// 压缩模块
const zlib = require('zlib');
// 创建 压缩模块 中 createGzip 方法
const gzip = zlib.createGzip();
// 监听请求事件 每次请求过来时触发
http.createServer((req, res) => {
    //  /favicon.ico 浏览器自动发起的请求，浏览器左侧的小图标  可以读取一个本地图片 返回显示
    if (req.url === '/favicon.ico') {
        // todo 读取本地图标
        return  res.end('测试 - favicon.ico');
    }
    // res 本质就是一个可写流
    // 设置响应头: writeHead() 响应正文write() 按照告诉浏览器 按照什么格式加载
    res.writeHead(200, //200是响应的状态码
        {
            "Content-Type": "text/html; charset=utf-8",
            "Content-Encoding": "gzip",//告诉浏览器端 - 文件传输 采用的 gzip压缩方式 - 让浏览器按那种方式解析
        }
    );
    // 创建可读流 读取本地静态文件
    const ReadStream =  fs.createReadStream("./test.html");
    const writeStream = fs.createReadStream("./test.text");
    /*
        通过管道 将ReadStream (本地静态文件的可读流) 送到 res 可写流中，

        注意: pipe方法传输完成后会自动结束进程 不需要 res.end() 进行结束传输

        将本地 ReadStream 可读流 通过管道 pipe(gzip)进行压缩 然后通过管道 pipe(res) 送到 res 可写流中，

        读取一个文件 通过管道 pipe(gzip)边压缩 边通过管道 pipe(res) 送到 res 可写流中。
    */
    /*
 
     使用try{}catch{} 自己捕获pipe报错， 防止报错 导致内存溢出
     否则发生的报错（是基于系统报的错），这种报错 如果此时启动了一台server服务器会卡住 引发服务器宕机 ， 产生大问题，因此需要及时去捕获一下
 */
    try {
        // 未压缩 传输 - 大小为 620B
        // ReadStream.pipe(res)
        // 压缩后 传输 - 大小为 215B 且 需要告诉浏览器端（在 writeHead 响应头中） 压缩方案 是那一种
        ReadStream.pipe(gzip).pipe(res);
        // writeStream.pipe(gzip).pipe(res);
    } catch (error) {
        console.log('gzip压缩传输==>', error)
    }
    //   传输结束
    // res.end();
}).listen(4399, () => {// 监听服务器端口号 创建好的返回回调
    console.log('OK,服务器创建成功-回调');
});