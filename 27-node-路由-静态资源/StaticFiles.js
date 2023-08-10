//静态资源管理
const fs = require('fs');
// 处理文件路径
const path = require('path');
// 安装第三方 mime 模块 根据 文件扩展名 返回对应的 Content-Type 类型值 让浏览器解析
const mime = require('mime')
// 判断静态文件及处理静态文件

/*
    输入的地址路径 匹配不到函数 可能是静态资源文件
    myURL.pathname 解析出来的 路径 如'/login' ，'/home' ,'/login.html'，'/home.html'等

    如输入的url地址为：http://localhost:4399/login.html
    如：但是此时封装的路由 并没有 '/login.html' 因此router['/login.html']() 函数匹配不到 走else 进入/404
    然后调用 封装的静态资源管理 StaticFiles 函数  '/login.html' 文件存在 返回 '/login.html'绝对路径  并且读取该文件返回给前端
*/
//核心代码： 判断是否是 静态资源 如 css js 等静态资源文件 返回文件绝对路径 + // 根据 文件扩展名 获取对应 Content-Type 类型值 让浏览器解析
function readStaticFile(req, res) {
    // 获取路径
    const myURL = new URL(req.url, 'http://127.0.0.1');
    /*
        __dirname：
        node中的一个全局变量 它的值是 当前执行命令的绝对路径（在那个文件夹下执行的启动命令 如：D:\project\electron\node-demo\27-node-路由-静态资源）

        因此通过 __dirname拼接上 + static文件夹 + myURL.pathname（如：/css/login.css） = 静态资源文件的绝对路径

        但是在拼接过程中的问题： __dirname+'\\static\\'+myURL.pathname （拼接乱套了）
         __dirname返回的路径在 windows 系统下 是 反斜杠
         myURL.pathname返回的路径是 正斜杠
         '\\static\\'需要2个反斜杠  因为要转译
        因此 windows 系统下返回的 有反斜杠也有正斜杠

        在 Linux 系统下返回的都是 正斜杠

        解决： 通过node提供的一个小模块 path
    */
    // console.log(__dirname,'static',myURL.pathname)
    // path 可以把这些路径按照系统自动拼接成你最希望的
    let pathname = path.join(__dirname, '/static', myURL.pathname);
    //处理myURL.pathname返回的路径为'/' 方式2： 如果 url 路径为 http://localhost:4399/ 那么myURL.pathname返回的路径为'/'
    // if (myURL.pathname === '/') {
    //     return false
    // }
    // 通过文件路径 判断 这个文件是否存在 // stat 查看文件夹或文件的详细信息 和 查看是否是 文件或文件夹
    try {

        // 同步校验文件夹 - 同步会阻塞后面的代码执行。
        if (fs.statSync(pathname)) {
            // 字符串切割 获取最后的文件扩展名 防止文件为多个. 如（login.min.js）
            let EXTENSION = pathname.split('.')[pathname.split('.').length - 1];
            // 根据 文件扩展名 获取对应 Content-Type 类型值 让浏览器解析
            let ContentType = mime.getType(EXTENSION);
            console.log('ContentType===>', ContentType)
            return { pathname, ContentType };
        }
    } catch (error) {
        console.log('statSync==>', error);
        // 文件夹不存在或错误 触发
        return false;
    }
}
// 导出
module.exports = readStaticFile