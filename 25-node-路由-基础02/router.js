// router.js 模板接口 - 包括静态资源 html文件 图标这些

const fs = require('fs').promises;
// 优化路由 - 策略模式
const router = {
    '/login': (res) => {
        render(res,'./static/login.html',200);
    },
    '/home': (res) => {
        render(res,'./static/home.html',200);
        // res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        // // 同步读取本地文件 - 可优化修改为异步读取 读取完成后 执行 res.write +res.end
        // // res.write(fs.readFileSync('./static/login.html'), 'utf-8')
        // // 异步读取文件
        // fs.readFile(
        //     './static/home.html',//文件夹路径 （相对路径或绝对路径都可以）
        //     'utf-8',//按什么格式读取文件,不写 默认格式为 Buffer (二进制数据)
        // ).then(data => {
        //     res.write(data, 'utf-8');
        //     // 通知浏览器 传输结束
        //     res.end();
        // }).catch(err=>{
        //     console.log(err);
        // });
    },
    '/404': (res) => {
        render(res,'./static/404.html',404);
        // res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        // // 同步读取本地文件 - 可优化修改为异步读取 读取完成后 执行 res.write +res.end
        // // res.write(fs.readFileSync('./static/login.html'), 'utf-8')
        // // 异步读取文件
        // fs.readFile(
        //     './static/404.html',//文件夹路径 （相对路径或绝对路径都可以）
        //     'utf-8',//按什么格式读取文件,不写 默认格式为 Buffer (二进制数据)
        // ).then(data => {
        //     res.write(data, 'utf-8');
        //     // 通知浏览器 传输结束
        //     res.end();
        // }).catch(err=>{
        //     console.log(err);
        // });
    },
    '/favicon.ico':(res)=>{
        render(res,'./static/favicon.ico',200,"image/x-icon;");
        // 设置头 渲染文件的方式 - image/x-icon
        // res.writeHead(200, { "Content-Type": "image/x-icon; charset=utf-8" });
        // // 同步读取本地文件 - 可优化修改为异步读取 读取完成后 执行 res.write +res.end
        // // res.write(fs.readFileSync('./static/login.html'), 'utf-8')
        // // 异步读取 本地图片 - 设置浏览器 左上角的小图标
        // fs.readFile(
        //     './static/favicon.ico',//文件夹路径 （相对路径或绝对路径都可以）
        // ).then(data => {
        //     res.write(data);
        //     // 通知浏览器 传输结束
        //     res.end();
        // }).catch(err=>{
        //     console.log(err);
        // });
    }
};
function render(res,path,status,type=''){
    res.writeHead(status, // 设置头部 状态码
        { "Content-Type": `${type?type:'text/html;'}charset=utf-8`
    });
    // 同步读取本地文件 - 可优化修改为异步读取 读取完成后 执行 res.write +res.end
    // res.write(fs.readFileSync('./static/login.html'), 'utf-8')
    // 异步读取文件
    fs.readFile(
        path,//文件夹路径 （相对路径或绝对路径都可以）
        //'utf-8',//按什么格式读取文件,不写 默认格式为 Buffer (二进制数据)
    ).then(data => {
        res.write(data);
        // 通知浏览器 传输结束
        res.end();
    }).catch(err=>{
        console.log(err);
    });
}
// 导出
module.exports = router;
// module.exports = {
//     router,
//     routerStatus,
// }