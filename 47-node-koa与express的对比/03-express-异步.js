// 引入 express
const express = require('express');
// express 不需要 new 实例化
const app = express();

/*
    代码在异步情况下：
    express 似乎 和 koa洋葱模型 代码执行没什么区别 执行的打印结果 如下:
    异步情况下- express- A中间件,调用next()之前 ->A1111
    异步情况下- express- B中间件,执行 -> B2222
    异步情况下- express- A中间件,调用next()之后 控制权回来 ->A444 undefined
    异步情况下- express- B中间件,执行 -> B3333 1231qewqwe11

    根据打印输出由此可以验证：express 实际上并不是 和 koa的洋葱模型 类似。

    但是其实是 // A 中间件 内的  next(); 还没有执行完 才继续执行的下两行代码：
    // 输出打印的内容 及 B 中间件 挂载的token
    console.log('异步情况下- express- A中间件,调用next()之后 控制权回来 ->A444', res.mytoken);
    // 给前端 返回数据
    res.send('异步情况下- express => hello  world')
    造成和 koa洋葱模型 执行类似 的假象 ，这一点 在异步情况下 就会暴露


    但是 上面的这个本身就不是 express 机制用法：
    正常 来说 A 中间件的 逻辑执行完 调用next() 后 就可以在 B中间件中继续执行剩余的逻辑 及其res.send()
    如下用法 设计是更加符合 express的 开发方式：
        app.use((req,res,next)=>{ // A 中间件
            if(req.url === '/favicon.icon')return; // 请求的页面右上角 小图标 不执行 
            console.log('异步情况下- express- A中间件,调用next()之前 ->A1111');
            // 调用 next 执行 下一个中间件 B
            next();
        })
        app.use( async (req,res,next)=>{// B 中间件
            console.log('异步情况下- express- B中间件,执行 -> B2222');
            //等待  异步获取到 toke 后 继续执行 下面的 打印输出
            let token=await getToken();
            // res 上 增加一个自定义属性 将 token 挂载 上去
            res.mytoken= token;
            console.log('异步情况下- express- B中间件,执行 -> B3333', res.mytoken);

            // 输出打印的内容 及 B 中间件 挂载的token
            console.log('异步情况下- express- A中间件,调用next()之后 控制权回来 ->A444', res.mytoken);

            // 给前端 返回数据
            res.send('异步情况下- express => hello  world')
        })
    express 就应该是 A中间件 执行完 next 立即交给下一个中间件  执行B中间件 执行完 next 在下一个，
    所以你会发现 给前端的响应 res.send()应该是在最后一个中间件中来做处理的

*/
// 模拟场景 -如 A 中间件中 给用户返回信息 ，但是必须先获取token ，在继续往下走 返回信息

app.use(async (req,res,next)=>{ // A 中间件
    if(req.url === '/favicon.icon')return; // 请求的页面右上角 小图标 不执行 
    console.log('异步情况下- express- A中间件,调用next()之前 ->A1111');
    // 调用 next 执行 下一个中间件 B
    await next();

    // 输出打印的内容 及 B 中间件 挂载的token
    console.log('异步情况下- express- A中间件,调用next()之后 控制权回来 ->A444', res.mytoken);

    // 给前端 返回数据
    res.send('异步情况下- express => hello  world')
})

app.use( async (req,res,next)=>{// B 中间件

    console.log('异步情况下- express- B中间件,执行 -> B2222');
    //等待  异步获取到 toke 后 继续执行 下面的 打印输出
    let token=await getToken();
    // res 上 增加一个自定义属性 将 token 挂载 上去
    res.mytoken= token;
    console.log('异步情况下- express- B中间件,执行 -> B3333', res.mytoken);
})

// 写一个 模拟异步
function getToken(){
    // 创建一个Promise对象 - Promise是一种用于处理异步操作的编程模式
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            // 模拟异步 1000后 resolve返回 token
            resolve('1231qewqwe11')
        },1000)
    })
}

// 启动服务器 -  监听 端口号方式  接收一个回调函数, 服务器创建成功时 就会调用
app.listen(4399,()=>{
    console.log('OK,服务器创建成功-回调')
})