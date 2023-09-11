// 引入 koa 路由模块
const Router = require('koa-router')

// new 将路由模块 实例化
const router =new Router();

//引入 自定义封装的 生成token + 校验 token 函数
const JWT = require('../../util/JWT');

/*
    router.prefix('/api')
    可以 在路由入口文件中 统一加 前缀的 案例在：routers/index.js 路由入口文件 可见

    也可以在 子路由中单独  加 前缀的

    子路由中单独 加 前缀 请求路径如在：
    http://localhost:4399/user/api/123123 请求方式 put

    注意：当前  router.prefix('/api') 加 前缀 是写在了 get 请求下面 但是 get请求 还是需要加上 前缀的：
    http://localhost:4399/list/api   请求方式  get请求 案例在：routers/lists/index.js 中 可见
    也就是说 router.prefix('/api') 并不受 代码位置影响
    

*/

// router.prefix('/api')
/*
 在 index.js 入口文件 中 当前路由模块 被注册成了 路由级中间件 ，并且 path 一级路径 为'/user',
 
 因此当前 users文件夹下index.js  封装的 路由为二级路径  想要通过 http://localhost:4399/user/ 此二级路径就不需要写然后东西了
 除非 需要二级路径 
*/
// 请求写法2：链式写法 如下
router.get('/',(ctx,next)=>{ // 请求路径 ：http://localhost:4399/user/  请求方式： get
    /*
        访问本地的静态资源 ： http://localhost:4399/html/login.html 内包含了 ajax 请求
        get 请求 获取参数
        方式1：ctx.query 获取到的是 解析之后的对象 如：{ username: '1', password: '2' }
        方式1：ctx.querystring 获取到的是 未解析的 username=1&password=2
    */
    console.log(ctx.query,ctx.querystring)
    ctx.body={Code:0,Data:{username:'小明',age:18}};
}).post('/',(ctx,next)=>{ // 请求路径 ：http://localhost:4399/user/  请求方式： post
    /*
    访问本地的静态资源 ： http://localhost:4399/html/login.html 内包含了 ajax 请求
        post 请求获取参数
        koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
    */
    console.log(ctx.request.body); // 获取到的是 { username: '小明', password: '123123' }
    ctx.body={Code:0,Message:'添加-user-数据成功'}
})
.del('/:id',(ctx,next)=>{ // 请求路径 ：http://localhost:4399/user/123123id 请求方式： delete
    console.log('获取请求参数delete=>',ctx.params)
    ctx.body = {Code:0,Message:'删除-user-数据成功'}
})
.put('/:id',(ctx,next)=>{// 请求路径 ：http://localhost:4399/user/123123id 请求方式： put
    console.log('获取请求参数put=>',ctx.params)
    ctx.body = {Code:0,Message:'修改-user-数据成功'}
})
// 登录接口
router.post('/login',(ctx,next)=>{
    // 获取 post 请求参数
    console.log(ctx.request.body)
    const {username,password} =ctx.request.body
    if( username == 'admin' && password =='123'){
        //登录成功 -  设置 header 里的token

        /*
                jwt.sign 生成token 第一个参数必须为object类型   如{_id, username }
            */ 
            const obj= {_id:'aaaa',username: username}
             // 登录成功 生成token data[0]加密数据   过期时间-字符串类型(默认毫秒 1000*60 = 1分钟 1000*60*60=1小时 ，或'10s'=>10秒 或'1h'=>1小时 或 '1d'=>1天  )
            const token =JWT.generate(obj,(1000*60*5).toString());// 过期时间 5 分钟
            /*  建议：默认不成文的规范
                后端返回 token时 放在header中 如： ctx.set(自定义字段名，value) // 通常 token的 字段名为 Authorization 如下
                设置 token 的 字段名 必须前后端 约定好 使用同一个字段 
                前端传入 token时 也是放在header中
            */
           console.log(token)
           ctx.set('Authorization',token)
        ctx.body = {Code:0,Message:'login - 登录成功'}

    }else{
        ctx.body = {Code:-1,Message:'login - 登录'}
    }
})
// 导出
module.exports = router;