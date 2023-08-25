// 引入 koa 模块
const koa = require('koa')
// koa 需要 new 实例化
const app = new koa();

/*
    异步情况下：验证 koa洋葱模型： 执行打印的结果如下：

    异步情况下-koa- A中间件,调用next()之前 ->A1111
    异步情况下-koa- B中间件,执行 -> B2222
    异步情况下-koa- B中间件,执行 -> B3333
    异步情况下-koa- A中间件,调用next()之后 控制权回来 ->A444 1231qewqwe11

    由此验证了 koa洋葱模型-说明解释：
    A 中间件内部 代码逻辑是: console.log('调用next()执行 B中间件之前 ') 调用next() console.log('调用next()执行 B中间件之后 '),
    此时执行 A 中间件内部执行完 第一个console.log ，执行调用 next() 执行 B中间件（此时代码执行的控制权 交给了B中间件），B中间件执行完成之后 ，
    代码执行的控制权会 回到A中间件继续执行 A中间件内的代码逻辑( 继续执行第二个 console.log)
*/

app.use(async (ctx, next) => { // A 中间件
    if (ctx.url === '/favicon.icon') return; // 请求的页面右上角 小图标 不执行 
    console.log('异步情况下-koa- A中间件,调用next()之前 ->A1111');


    // 调用 next 执行 下一个中间件 B 并且可以获取到 B 中间件 return 返回的 token
    //  await next();
     // 获取 token 方式1：  B 中间件挂载在 ctx增加一个自定义属性  ctx.mytoken
    // let toke=ctx.mytoken;

      // 调用 next 执行 下一个中间件 B 并且可以获取到 B 中间件 return 返回的 token
    // 获取 token 方式2： 获取到 B 中间件 return 返回的 token
    let token = await next();

    console.log('异步情况下-koa- A中间件,调用next()之后 控制权回来 ->A444',token);

    // 给前端 返回数据
    ctx.body = 'koa => hello  world  token=>'+ token
})
app.use(async (ctx, next) => {// B 中间件
    console.log('异步情况下-koa- B中间件,执行 -> B2222');

    let token = await getToken();
    // 方式1 ： ctx 上 增加一个自定义属性 将 异步获取到的 token 挂载 上去
    // ctx.mytoken = token;

    console.log('异步情况下-koa- B中间件,执行 -> B3333');

     // 方式2 ： 直接 将 异步获取到的 token return 返回 A中间件中 接收next即可；
     return token;
})

// 写一个 模拟异步
function getToken() {
    // 创建一个Promise对象 - Promise是一种用于处理异步操作的编程模式
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 模拟异步 1000后 resolve返回 token
            resolve('1231qewqwe11')
        }, 1000)
    })
}

// 启动服务器 -  监听 端口号方式  接收一个回调函数, 服务器创建成功时 就会调用
app.listen(4399, () => {
    console.log('OK,服务器创建成功-回调')
})