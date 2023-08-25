// 引入 express
const express = require('express');
// express 不需要 new 实例化
const app = express();

/*
    代码在同步情况下：
    express 似乎 和 koa洋葱模型 代码执行没什么区别 执行的打印结果 如下:
    同步情况下- express- A中间件,调用next()之前 ->A1111
    同步情况下- express- B中间件,执行 -> B2222
    同步情况下- express- A中间件,调用next()之后 控制权回来 ->A333


    但是其实是 A 中间件 内的  next(); 还没有执行完 才继续执行的下两行代码：

    console.log('express- A中间件,调用next()之后 控制权回来 ->A333');
    // 给前端 返回数据
    res.send('express => hello  world')

    造成和 koa洋葱模型 执行类似 的假象 ，这一点 在异步情况下 就会暴露:
    验证说明 ：在03-express-异步.js 中可见

*/

app.use((req,res,next)=>{ // A 中间件
    if(req.url === '/favicon.icon')return; // 请求的页面右上角 小图标 不执行 
    console.log('同步情况下- express- A中间件,调用next()之前 ->A1111');
    // 调用 next 执行 下一个中间件 B
    next();
    console.log('同步情况下- express- A中间件,调用next()之后 控制权回来 ->A333');

    // 给前端 返回数据
    res.send('同步情况下- express => hello  world')
})
app.use((req,res,next)=>{// B 中间件
    console.log('同步情况下- express- B中间件,执行 -> B2222');
})
// 启动服务器 -  监听 端口号方式  接收一个回调函数, 服务器创建成功时 就会调用
app.listen(4399,()=>{
    console.log('OK,服务器创建成功-回调')
})