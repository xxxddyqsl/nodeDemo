const fs = require('fs').promises;
// 优化路由 - 策略模式
const router = {
    '/login': (res) => {
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        // 同步读取本地文件 - 可优化修改为异步读取 读取完成后 执行 res.write +res.end
        // res.write(fs.readFileSync('./static/login.html'), 'utf-8')
        // 异步读取文件
        fs.readFile(
            './static/login.html',//文件夹路径 （相对路径或绝对路径都可以）
            'utf-8',//按什么格式读取文件,不写 默认格式为 Buffer (二进制数据)
        ).then(data => {
            res.write(data, 'utf-8');
            // 通知浏览器 传输结束
            res.end();
        }).catch(err=>{
            console.log(err);
        });
    },
    '/home': (res) => {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        // 同步读取本地文件 - 可优化修改为异步读取 读取完成后 执行 res.write +res.end
        // res.write(fs.readFileSync('./static/login.html'), 'utf-8')
        // 异步读取文件
        fs.readFile(
            './static/home.html',//文件夹路径 （相对路径或绝对路径都可以）
            'utf-8',//按什么格式读取文件,不写 默认格式为 Buffer (二进制数据)
        ).then(data => {
            res.write(data, 'utf-8');
            // 通知浏览器 传输结束
            res.end();
        }).catch(err=>{
            console.log(err);
        });
    },
    '/404': (res) => {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        // 同步读取本地文件 - 可优化修改为异步读取 读取完成后 执行 res.write +res.end
        // res.write(fs.readFileSync('./static/login.html'), 'utf-8')
        // 异步读取文件
        fs.readFile(
            './static/404.html',//文件夹路径 （相对路径或绝对路径都可以）
            'utf-8',//按什么格式读取文件,不写 默认格式为 Buffer (二进制数据)
        ).then(data => {
            res.write(data, 'utf-8');
            // 通知浏览器 传输结束
            res.end();
        }).catch(err=>{
            console.log(err);
        });
    },
};
// 导出
module.exports = router;
// module.exports = {
//     router,
//     routerStatus,
// }