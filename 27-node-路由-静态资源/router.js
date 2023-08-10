// router.js 模板接口 - 包括静态资源 html文件 图标这些

const fs = require('fs').promises;

//导入 自定义封装的 静态资源管理模块

const StaticFiles = require('./StaticFiles')
// 优化路由 - 策略模式
const router = {
    //处理myURL.pathname返回的路径为'/' 方式1： - 如输入的url地址为：http://localhost:4399  myURL.pathname 解析出来的为 '/'
    '/': (req,res) => {
        render(res,'./static/home.html',200);
    },
    '/login': (req,res) => {
        render(res,'./static/login.html',200);
    },
    '/home': (req,res) => {
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
    '/404':(req,res) => {
        /*
            输入的地址路径 匹配不到函数 可能是静态资源文件
            如输入的url地址为：http://localhost:4399/login.html
            myURL.pathname 解析出来的 路径 如'/login' ，'/home' ,'/login.html'等
            但是此时封装的路由 并没有 '/login.html' 因此router['/login.html']() 函数匹配不到 走else 进入/404
            然后调用 封装的静态资源管理 StaticFiles 函数  '/login.html' 文件存在 返回 '/login.html'绝对路径  并且读取该文件返回给前端

            当然如果输入的 url地址为：http://localhost:4399/loginQQ.html 。 /loginQQ.html 这种文件夹中没有的文件 也没有该路由 还是返回404页面
        */
         // 调用静态资源管理 - 校验是否是静态资源文件
        let msg = StaticFiles(req,res);
        // 静态文件存在时 返回一个对象内有文件路径及Content-Type 否则 返回false
        if(msg){
            // 给前端返回 静态资源文件 ContentType 传入"Content-Type"需要浏览器根据什么类型解析文件
            return render(res,msg.pathname,200,msg.ContentType);
        }
        //不是 静态资源文件 返回前端 404
        // console.log('StaticFiles=>>')
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
    /*
        此时封装的 '/favicon.ico':(req,res)=>{}函数 已经可以注释 不需要单独封装，因为该路径请求 http://localhost:4399/favicon.ico 可以走 封装的'/404':(req,res){}中
        触发 封装的静态资源管理 StaticFiles 函数 返回 '/favicon.ico'绝对路径 并且读取该文件返回给前端
    */
    // '/favicon.ico':(req,res)=>{
    //     render(res,'./static/favicon.ico',200,"image/x-icon");
    //     // 设置头 渲染文件的方式 - image/x-icon
    //     // res.writeHead(200, { "Content-Type": "image/x-icon; charset=utf-8" });
    //     // // 同步读取本地文件 - 可优化修改为异步读取 读取完成后 执行 res.write +res.end
    //     // // res.write(fs.readFileSync('./static/login.html'), 'utf-8')
    //     // // 异步读取 本地图片 - 设置浏览器 左上角的小图标
    //     // fs.readFile(
    //     //     './static/favicon.ico',//文件夹路径 （相对路径或绝对路径都可以）
    //     // ).then(data => {
    //     //     res.write(data);
    //     //     // 通知浏览器 传输结束
    //     //     res.end();
    //     // }).catch(err=>{
    //     //     console.log(err);
    //     // });
    // }
};
// 处理显示返回 - 读取文件 给浏览器返回数据
function render(res,path,status,type=''){
    res.writeHead(status, // 设置头部 状态码
        { "Content-Type": `${type?type:'text/html'};charset=utf-8`
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