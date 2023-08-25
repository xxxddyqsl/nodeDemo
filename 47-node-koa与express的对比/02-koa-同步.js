// 引入 koa 模块
const koa = require('koa')
// koa 需要 new 实例化
const app =new koa();

/*
    同步情况下：验证 koa洋葱模型： 执行打印的结果如下：
    koa- A中间件,调用next()之前 ->A1111
    koa- B中间件,执行 -> B2222
    koa- A中间件,调用next()之后 控制权回来 ->A333

*/

app.use((ctx,next)=>{ // A 中间件
    if(ctx.url === '/favicon.icon')return; // 请求的页面右上角 小图标 不执行 
    console.log('koa- A中间件,调用next()之前 ->A1111');
    // 调用 next 执行 下一个中间件 B
    next();
    console.log('koa- A中间件,调用next()之后 控制权回来 ->A333');

    // 给前端 返回数据
    ctx.body='koa => hello  world'
})
app.use((ctx,next)=>{// B 中间件
    console.log('koa- B中间件,执行 -> B2222');
})
// 启动服务器 -  监听 端口号方式  接收一个回调函数, 服务器创建成功时 就会调用
app.listen(4399,()=>{
    console.log('OK,服务器创建成功-回调')
})