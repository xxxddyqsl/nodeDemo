/*
    与 02-中间件-路由级中间件-01.js 不同的是 当前路由模块根据不同分支 单独写 路由模块 ,优点 代码更清晰 后期维护更方便

    应用级中间件 与 路由级别中间件 的区别：
    1：应用级中间件是挂载在 app 身上的 如: app.use()  app.get()
    2：路由级中间件 是挂载在绑定 在 express.Router() 身上的

*/
const express = require('express');
const app = express();
// 导入 封装的路由级中间件 home分支路由模块 根据不同分支 单独写 路由模块 多个接口模块的体现
const HomeRouter = require('./router/homeRouter');
const LoginRouter = require('./router/LoginRouter');

// 配置解析 POST 请求参数的 中间件 - 不下载第三方库，已经内置了
// 调用express下的urlencoded()方法 传入设置配置 表示在这个处理post 请求参数 - form编码格式
/*
    form 编码的格式如下:
    前端请求：
    接口地址: http://localhost:4399/login
    请求参数：usename=小明&password=123456 （这种参数为form 编码的格式）
    并且前端请求的头（Header）Content-Type:'application/x-www-form-urlencoded'

    在static文件夹下images文件夹下 POST请求-参数为form编码-案例-1.png 中可见 postman 测试pos请求接口的案例
*/
app.use(express.urlencoded({extended:false}));//解析 post 请求参数 -格式为 form 编码的格式 如：usename=小明&password=123456

// 调用express下的 json() 方法 传入设置配置 表示在这个处理post 请求参数 - json格式
/*
   
    前端请求：
    接口地址: http://localhost:4399/login
    请求参数：JSON.stringify({usename:'小明',password:'123456'}) （这种参数为 JSON字符串 的格式）
    并且前端请求的头（Header）如  headers:{'Content-Type':'application/json'}

    在static文件夹下images文件夹下 POST请求-参数为JSON字符串格式-案例-2.png 中可见 postman 测试pos请求接口的案例
    application/json; charset=utf-8 编码的格式解析请求参数配置 如:app.use(express.json());
*/
app.use(express.json());//解析 post请求 - 参数格式为 JSON字符串的格式 如：JSON.stringify({usename:'小明',password:'123456'})

// 当前上面代码配置(form 编码的格式 + json 格式) post 解析请求参数的两格式中间件，因此当前支持 前端 form编码格式+json格式的 两种post请求解析参数


//  应用级中间件(挂载在 app 身上的) -> app.use()注册 应用级中间件 无path路径 默认所有请求都会执行 万能匹配
app.use((req, res, next) => {
    console.log('应用级中间件==> 验证 token');
    // 可通过 next 给下一个中间件 传入参数 如 let a= {name:'测试参数'}; next(a); 具体案例 03-中间件-错误中间件.js 空间
    next();
});


app.use('/home', HomeRouter);
app.use('/login', LoginRouter);

// 错误中间件 - 写法1：
app.use((req, res, next) => {
    res.status(404).send('404 Not Found,访问的页面丢失了')
});
// 启动服务器 - 监听 端口号 接收一个回调函数, 服务器创建成功时 就会调用
app.listen(4399, () => {
    console.log('OK,服务器创建成功-回调');
});