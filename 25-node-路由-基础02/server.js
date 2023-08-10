// 当前文件
// const fs = require('fs').promises;
//创建服务器
const http = require('http');
// 方式1 导入 自定义模块化的 方法 - 路由
// const moduleRouter = require('./router');
// 方式1 导入 自定义 api接口
// const api = require('./api');
// 创建 一个 空对象  将导入的 moduleRouter 路由对象 + api接口对象 合并
const Router = {};
// 方式1：通过es6的 Object.assign()方法 合并 两个 自定义的模块化 对象 （moduleRouter 路由 + api接口）
// Object.assign(Router,moduleRouter)
// Object.assign(Router,api)

//方式2 优化自定义封装 use 函数 将use暴露出去 让 需要合并的对象调用
function use(obj){
    Object.assign(Router,obj)
}

// console.log(Router)

// 封装自定义 创建服务器 函数
function start() {
    // 创建服务器的方法 createServer()
    const server = http.createServer();
    // 监听请求事件 每次请求过来时触发
    server.on('request', (req, res) => {
        // console.log(req, res)
        // req是接收浏览器传的参数，res是返回渲染的内容
        // console.log(req, res);
        //  /favicon.ico 浏览器自动发起的请求，浏览器左侧的小图标  可以读取一个本地图片 返回显示
        // if (req.url === '/favicon.ico') {
        //     // todo 读取本地图标
        //     return
        // }
        // console.log(url.parse(req.url,true),query.id,query.name);
        const myURL = new URL(req.url, 'http://localhost:4399/');
        /*
            获取 url后的参数 返回URLSearchParams对象 （可以通过迭代器循环取出里面的值，返回的值类型为数组 ）如下使用方法：
        */
        //  obj 为数组
        // for(let obj of myURL.searchParams){console.log(obj)}
        // 可通过 es6的解构  获取 obj 为数组内的值
        // for (let [key, value] of myURL.searchParams) {
        //     console.log('searchParams==>', key, value);
        // }
        // 也可以 通过myURL.searchParams.get() 方法 获取指定的参数 返回
        // console.log(myURL.searchParams.get('id'));

        // 基础路由
        // switch (myURL.pathname) {
        //     case '/login':
        //         res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        //         // 同步读取本地文件 - 可优化修改为异步读取 读取完成后 执行 res.write +res.end
        //         // res.write(fs.readFileSync('./static/login.html'), 'utf-8')
        //         // 异步读取文件
        //         fs.readFile(
        //             './static/login.html',//文件夹路径 （相对路径或绝对路径都可以）
        //             'utf-8',//按什么格式读取文件,不写 默认格式为 Buffer (二进制数据)
        //         ).then(data=>{
        //             res.write(data, 'utf-8')
        //             // 通知浏览器 传输结束
        //             res.end();
        //         })
        //         break
        //     case '/home':
        //         res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        //         // res.write(fs.readFileSync('./static/home.html'), 'utf-8')
        //         // 异步读取文件
        //         fs.readFile(
        //             './static/home.html',//文件夹路径 （相对路径或绝对路径都可以）
        //             'utf-8',//按什么格式读取文件,不写 默认格式为 Buffer (二进制数据)
        //         ).then(data=>{
        //             res.write(data, 'utf-8')
        //             // 通知浏览器 传输结束
        //             res.end();
        //         })
        //         break
        //     default:
        //         res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        //         // res.write(fs.readFileSync('./static/404.html'), 'utf-8')
        //          // 异步读取文件
        //          fs.readFile(
        //             './static/404.html',//文件夹路径 （相对路径或绝对路径都可以）
        //             'utf-8',//按什么格式读取文件,不写 默认格式为 Buffer (二进制数据)
        //         ).then(data=>{
        //             res.write(data, 'utf-8');
        //             // 通知浏览器 传输结束
        //             res.end();
        //         })
        //         break
        // }

        try {
            // 改造优化基础路由 - 策略模式 -
            // moduleRouter[myURL.pathname](res);// 输入的地址路径 匹配到函数 执行函数 否则报错方法不存在 执行/404
            Router[myURL.pathname](res);
        } catch (error) {
            // moduleRouter['/404'](res);
            Router['/404'](res);

        }
    }).listen('4399', () => {
        console.log('OK,服务器创建成功-回调');
    })
}
// 导出 封装的服务器
exports.start = start;
exports.use = use;