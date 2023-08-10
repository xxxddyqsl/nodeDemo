



const express = require('express');
// express 是一个函数 通过执行 得到一个 app 实例 可以通过这个app实例注册中间件等
const app = express();
/*
    通过app.get(ptah,(req,res)=>{}) 创建服务器
    第一个参数 为路由的路径和请求方法一起定义了请求的端点，它可以是字符串（如固定的：'/login'）、字符串模板 或者 正则表达式。
    第一个参数 字符串（要匹配的路径）   '/' 访问的路径  如 http://localhost:4399/  通过new url()的 pathname 解析路径返回的就是'/' （ 文件夹 -  27-node-路由-静态资源中有案例 ）

    第二 个参数 回调函数 // req是接收浏览器传的参数，res是返回渲染的内容
*/
/*
    路由介绍：
    路由是指如何定义应用的端点（URls）以及如何响应客户端的请求。

    路由是由一个URl、HTTP请求（GET ，POST等） 和若干句柄组成，它的结构如下： app.METHOD(path,[callback...],callback),app 是 express对象的一个实例， METHOD是一个HTTP请求方法，
    path是服务器上的路径， callback 是当路由匹配时要执行的函数。
*/

// 下面是一个基本的路由示例：
// 1： 固定字符串
// 1-1：  匹配根路径的请求 固定字符串
app.get('/', (req, res) => { // 访问的url地址为http://localhost:4399
    // 方式2：使用  express 进行了二次封装的 res.send() 方式 可以不需要像之前一样 设置 头部信息（如：（设置头部信息'Content-Type':'application/json; charset=utf-8'）） 告诉浏览器 按什么格式解析 传输过去内容
    res.send('root');

});
// 1-2： 匹配 /login 路径的请求 固定字符串
app.get('/login', (req, res) => { // 访问的url地址为http://localhost:4399/login
    res.send('login');
});

//2： 使用字符串模式的路由 路径示例：
// 2-1： 如 匹配的 acd 和 abcd 路径的请求都是可以访问  '/ab?cd': ?的意思是前一个值 b 可选的 可以写（如：/abcd） 也可以 不写（如：/acd）
// app.get('/ab?cd',(req,res)=>{ // 访问的url地址为http://localhost:4399/acd 或者http://localhost:4399/abcd
//     res.send('ab?cd==>ok');
// });

// 2-2： 常用： 如 匹配的  /ab/*** 的格式 路径的请求都是可以访问  '/ab/:id（/:id为随机动态的参数 如果有多个随机动态的参数 那也可以继续在后面追加 如 '/ab/:id/:id2）'  :的意思是 占位符 你的格式必须满足 /ab/*** 的格式 id并不是固定的 是动态的参数值（可以是12123也可以是pp998等等） 只需要满足前面说的格式 如 http://localhost:4399/ab/f43245bd9824430b973fbf57320bb38b
// app.get('/ab/:id',(req,res)=>{ // 访问的url地址为 http://localhost:4399/ab/f43245bd9824430b973fbf57320bb38b 或者 http://localhost:4399/ab/123456789 等等
//     res.send('ab/:id==>ok');
// });

// 2-2-1： 如果是:id 随机动态的参数+固定的值  可以继续在后面追加  但是你的格式必须满足 /ab/***/login  的格式 如 '/ab/:id/:id2
// app.get('/ab/:id/login',(req,res)=>{ // 访问的url地址为 http://localhost:4399/ab/f43245bd9824430b973fbf57320bb38b/login 或者 http://localhost:4399/ab/123456789/login 等等
//     res.send('/ab/:id/login ==>ok');
// });

// 2-2-2： 如果需要 多个 /:id 随机动态的参数  可以继续在后面追加 但是你的格式必须满足 /ab/***/***  的格式 如 '/ab/:id/:id2
// app.get('/ab/:id/:id2',(req,res)=>{ // 访问的url地址为 http://localhost:4399/ab/f43245bd9824430b973fbf57320bb38b/999 或者 http://localhost:4399/ab/123456789/888 等等
//     res.send('/ab/:id/:id2 ==>ok');
// });

//2-3：'/ef+gh' 匹配 /efgh、/effgh、/efffgh 等等路径的请求都是可以访问  '/ef+gh' +的意思是前一个值 f 是可以重复 N 次的意思 且f至少出现一次 的格式
// app.get('/ef+gh',(req,res)=>{ // 访问的url地址为 http://localhost:4399/ab/efgh 或者 http://localhost:4399/effffgh 等等
//     res.send('/ef+gh ==>ok');
// });

//2-4：'/ef*gh' 匹配 /ef1gh、/ef123gh、/ef1f23gh 等等路径的请求都是可以访问  '/ef*gh' +的意思是 在 ef 和 gh 中间 可以输入 任意字符串 的格式 只要你的格式满足 /ef***gh
// app.get('/ef*gh',(req,res)=>{ // 访问的url地址为 http://localhost:4399/ef99999gh 或者 http://localhost:4399/ef00ffqe0gh 等等
//     res.send('/ef*gh ==>ok');
// });

//2-5：'/ab(cd)?e' 匹配 /abe 和 /abcde 路径的请求都是可以访问  '/ab(cd)?e': (cd)?的意思是 (**)括号内的内容是 可选的 可以写（如：/abcde） 也可以 不写（如：/abe） 注意：括号内的内容 要么 都写 要么 都不写
// app.get('/ab(cd)?e',(req,res)=>{ // 访问的url地址为 http://localhost:4399/abcde 或者 http://localhost:4399/abe
//     res.send('/ab(cd)?e ==>ok');
// });


//3： 使用 正则表达式 的路由 路径示例：

// 3-1 : /a/  正则匹配任何 含有 a 的路径
app.get(/a/, (req, res) => { // 访问的url地址为 http://localhost:4399/123a1 或者 http://localhost:4399/ccacc
    res.send('/a/ ==>ok');
});

// 3-2 : /.*fly$/ 正则匹配 /butterfly 、/dragonfly 等等 不匹配 /butterflyman 、 /dragonfly man 等  '/.*fly$/' 其中 .* 的意思 前面任意N个字符  后面的 fly$ 的意思 必须以为 fly 结尾的格式 如：http://localhost:4399/9999fly
app.get(/.*fly$/, (req, res) => { // 访问的url地址为 http://localhost:4399/fly 或 http://localhost:4399/butterfly 或者 http://localhost:4399/888fly 等等  必须以为 fly 结尾的格式
    res.send('/.*fly$/ ==>ok');
});


/*
    app.get(path,[callback...],callback)可以 放多个回调函数(req,res)=>{} （也可以叫：中间件 ） 
    例如 前一个回调函数  验证用户token过期 ， cookie 过期 ，验证通过 执行后面一个回调函数 进行 查询 数据库 + 返回内容。

    当然也可以全部放在 一个 回调函数中执行 只是代码显示的比较拥挤

    可以为请求处理提供多个回调函数，其行为类似 中间件 ，唯一的区别是这些回调函数有可能调用 next('roue')方法而略过其他路由回调函数，
    可以利用该机制为路由定义前提条件，如果在现有路径上继续执行没有意义（就是 类似 验证不通过或者报错等等 就不在往下执行下一个回调函数（中间件） ），则可将控制权交给剩下的路径（就是调用next()方法让下一个回调函数（中间件） 继续执行）。

    使用多个回调函数处理路由（记得指定next 对象）：
*/
// 写法1： 使用多个回调函数处理路由（记得指定next 对象）：
// 第3个参数 next 让不让继续 往下执行下一个 回调函数（中间件）的核心方法
// app.get('/home',(req,res,next)=>{
//     //逻辑1： 验证用户token过期 ， cookie 过期

//     console.log('验证 token + 验证 cookie');
//     // 模拟 ： 验证成功
//     const isValid = true;
//     if(isValid){
//         // 调用 next() 方法 继续执行 下一个中间件 不调用不会继续执行 
//         next();
//     }else{
//         // 返回 错误
//         res.send('error: 用户token过期 , cookie 过期')
//     }
// },(req,res)=>{
//      //逻辑2： 查询 数据库

//     //逻辑3： 返回内容
//     res.send({list:[1,2,3]})
// })

// 写法2： 使用多个回调函数处理路由（记得指定next 对象） 支持 数组的写法 相较于上一个写法 数组的写法更加优雅,简洁 如下:
const callback1 = (req, res, next) => {
    //逻辑1： 验证用户token过期 ， cookie 过期
    console.log('验证 token + 验证 cookie');
    // 模拟 ： 验证成功
    const isValid = true;
    if (isValid) {
        // 中间件 之间通信 例如 验证用户token 经过计算 得到的结果 但是 callback2 回调中也需要使用这个 ，可以通过自定义在res身上增加一个属性 如：
        res.kerwin = '这是经过 callback1 计算的token 结果'

        // 调用 next() 方法 继续执行 下一个中间件 不调用不会继续执行
        next();
    } else {
        // 返回 错误  执行完  res.send 之后 就算调用 next() 方法也是无效的  res.send中是封装包含了 res.write和 res.end（结束）的
        res.send('error: 用户token 失效 , cookie 过期')
    };
};
const callback2 = (req, res, next) => {
    console.log('home:中间件 之间通信===>',res.kerwin,)
    console.log('模拟查询 数据库',);
    next();
};
const callback3 = (req, res) => {
    res.send({ list: [1, 2, 3] })
};
app.get('/home', [callback1, callback2, callback3]);
app.get('/list', [callback1,],(req,res)=>{
    console.log('list:中间件 之间通信===>',res.kerwin)
    res.send('list')
});

//启动服务器 -  监听 端口号 接收一个回调函数, 服务器创建成功时 就会调用
app.listen(4399, () => {
    console.log('OK,服务器创建成功-回调')
})
