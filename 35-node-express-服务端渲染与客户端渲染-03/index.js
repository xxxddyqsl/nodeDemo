/*
    服务端渲染（模板引擎）

    1. 服务器渲染，后端嵌套模板，后端渲染模板，SSR（后端把页面组装） 如：PC端->拉钩官网
        a.做好静态页面，动态效果。
        b.把前端代码提供给后端，后端把静态HTML以及里面的假数据删掉，通过模板进行动态生成HTML的内容。

    服务器渲染的特点： 右键查看网页源码是可以看到所以的DOM 节点，爬虫是可以爬到完整的DOM 所有的数据dom节点，
    因为在后端就已经组装好了页面，拿到浏览器端就已经是完整的html页面。

    服务器渲染的优点：对爬虫+搜索引擎 非常友好
    服务器渲染的缺点：前后端协做麻烦

    2.前后端分离，BSR（前端中组装页面） 当前 使用推荐 就是前后端分离 如：当前的 home.html、 login.html 
        a.做好静态页面，动态效果。
        b.json模拟，ajax，动态创建页面。
        c.真实接口数据，前后端联调。
        d.把前端提供给后端静态资源文件夹。

    前后端分离的特点：如 home.html 这种方式 对爬虫来说是不友好的，
    右键查看网页源码是看不到 数据的DOM的 看到的只是空的<ul></ul> DOM节，
    所有的li节点是后期在浏览器 动态插入生成的 所以我们看到的只是空的ul壳。因此如百度爬虫时 只是爬到了空的ul 没发现什么东西

    前后端分离的优点：前后端 协做 方便
    前后端分离的缺点：对爬虫+搜索引擎 不太友好

    // 1. 服务器渲染，后端嵌套模板，后端渲染模板，SSR（后端把页面组装）
    （渲染模板） 需要安装 第三方库 如：ejs 、 art 等等
    yarn add ejs
    // 将所以的 渲染模板 放在某个文件夹下 如 views

    1-1：配置渲染模板的目录 : app.set("views","./views") app.set("命名","路径：指定好在那个文件夹下")
    1-2：配置模板引擎：app.set("view engine","ejs"); app.set("view engine（设置渲染模板的引擎）","指定为什么引擎 当前为ejs")
*/
const express = require('express');
const app = express();
// 导入 封装的路由级中间件 home分支路由模块 根据不同分支 单独写 路由模块 多个接口模块的体现
const HomeRouter = require('./router/homeRouter');
const LoginRouter = require('./router/LoginRouter');

//后端服务器渲染 配置 渲染模板的目录 - views 存放模板文件的目录
app.set("views","./views");
// 方式1：后端服务器渲染 配置 模板的引擎 -  view engine, 设置当前模板用的引擎（当前为ejs）
// app.set("view engine","ejs");

// 方式2： 后端服务器渲染 - 不使用 .ejs文件 直接使用 html文件 路由访问 - 删除views 文件夹下的模板文件 如login.ejs 等等 改为 login.html或 home.html 该（views）文件夹下只能存在html文件其他静态资源文件不可以存在
app.set("view engine","html");// 从ejs 改成 html 在通过 app.engine('html',require('ejs').renderFile) 对这个自定义的html引擎 进行特殊的引擎说明
// 对上方自定义的html 引擎 进行特殊的引擎说明 应该通过ejs的模块 进行渲染
app.engine('html',require('ejs').renderFile);//支持直接渲染html文件

app.use(express.static('public'));//访问 http://localhost:4399/login.html 路径不需要加 public 即可访问到  public 下的login.html文件 或者 http://localhost:4399/css/login.css访问该静态文件目录下的css文件
//   可以设置多个 静态资源文件夹
app.use(express.static('uploads'));



/*
    当前 既支持 前后端分离渲染 如：（http://localhost:4399/login.html 访问）
    也支持 服务端渲染  如：（http://localhost:4399/login 访问）

*/

/*
    配置静态资源文件目录中间件  详细解释案例在 32-node-express-托管静态资源文件 可见
*/
app.use('/static',express.static('static'));//访问 http://localhost:4399/static/list.html 路径 因为设置path路径 需要加上 /static 才可访问到  static 下的list.html文件


/*
    配置解析 POST 请求参数的 中间件  详细解释案例在  31-node-express-获取请求参数文件夹中可见
*/
app.use(express.urlencoded({extended:false}));//解析 post 请求参数 -格式为 form 编码的格式 如：usename=小明&password=123456

// 配置解析 POST 请求参数的 中间件 - json格式
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
app.listen(3000, () => {
    console.log('OK,服务器创建成功-回调');
});