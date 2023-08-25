/*
    koa
        基于 Node.js 平台的下一代 web 开发架

*/
// 引入 koa
const koa = require('koa')
// new 进行koa 初始化 
const app = new koa();

/*
   app.use((ctx,next)=>{}) 应用级中间件
    ctx -则是 context的缩写 形参 上下文
    就是 类似express 中 req,res 只是相当于 将 req,res 合并在一起了


    ctx.res 拿到的是 nodejs原生的 response 对象
    ctx.req  拿到的是 nodejs原生的 request 对象

    ctx.response  给前端响应的对象  拿到的是 koa 封装好的  response 对象 类似 express 里的 res
    ctx.request   获取前端传入的值（header信息，参数等等 ）  拿到的是 koa 封装好的 request 对象  类似 express 里的 req

    绕过 Koa的 response 处理是 使用原生的node 属性是不被支持的 应避免使用以下 :
    res.statusCode
    res.writeHead()
    res.write()
    res.end()

    给前端 返回数据:
    之前 express 里的 res.send({code:0,data:[{name:'1'}]})
    而 koa 里面是  ctx.response.body = {code:0,data:[{name:'1'}]}
*/
app.use((ctx,next)=>{
   
    console.log( ctx,ctx.request)
    // 获取路径信息 如访问：http://localhost:4399/home 获取到 /home 
    console.log(ctx.request.path)
    //  给前端 返回数据: 支持 返回 text 文本
    // ctx.response.body = 'hello word';
    //  给前端 返回数据: 支持 返回 html 片段
    // ctx.response.body = '<h1>hello word</h1>';
    //  给前端 返回数据: 支持 返回 json数据
    // ctx.response.body ={code:0,data:[{name:'1'}],message:'hello word'} ;

     // koa支持简写 - ctx.request 或 ctx.response 是等效的 可以省略简写  如：
     //1：  给前端 返回数据: 支持 返回 json数据  ctx.response.body  简写  ctx.body 
    ctx.body ={code:0,data:[{name:'1'}],message:'hello word'}

    // 2： ctx.request.path 简写  ctx.path 获取路径信息
    console.log(' ctx.request - 简写 - 获取路径信息=>',ctx.path)

    // 通过   ctx.request.方法() 或者 ctx.request.方法() koa都是支持可以简写的


    // console.log(ctx.response,ctx.res)
})

// 启动服务器 -  监听 端口号方式 与express 一样的 接收一个回调函数, 服务器创建成功时 就会调用
app.listen(4399,()=>{
    console.log('OK,服务器创建成功-回调')
})
