// 路由级中间件写法 - 路由模块

const express = require('express');
// 获取 express 下的 Router() 路由方法
const router = express.Router();

/*
    应用级中间件此处 app.use('/login', LoginRouter); '/login' 为一级匹配，匹配到 '/login' 后 进入路由中间件 进行二级路径匹配
    如'/' 是可以直接返回数据 如'/swiper'需要  http://localhost:4399/login/swiper 才能返回数据;

    总结：先匹配 应用级中间件的path路径一级路径匹配 app.use('/login', LoginRouter); 然后进入 路由中间件 匹配 path路径进行二级路径匹配 ，以此类推.

    想要在匹配到'/login' 就可以返回东西 那在路由中间件中 path路径 要写成'/' 需要二级路径没有东西才能 匹配到 '/login'如下：
    router.get('/',(req,res)=>{  res.send('/login');}); 访问  http://localhost:4399/login 即可

    如果在 路由中间件中 二级路径 path 在写一个'/login' 如： router.get('/login',(req,res)=>{  res.send('/login/login');}); 那就是  http://localhost:4399/login/login 才能访问到返回东西，
    但是这就不符合 访问http://localhost:4399/login 匹配到'/login' 就返回东西的需求

*/
// 路由级中间件(响应前端的get请求)写法 -  多个接口模块的体现。
router.get('/', (req, res) => {// 访问 ：http://localhost:4399/login?usename=小明&password=123456
    // get请求获取参数：之前老的案例是获取参数的方法是通过 new URL() 而 在express中 通过 req.query 获取 传入的参数
    let params= req.query;
    console.log('get请求获取参数==>',params);
    if(params && params.usename=='小明' && params.password == '123456'){
        res.send({Code: 0,Data:{Status: 0,Id:'f43245bd9824430b973fbf57320bb38b',UseName:'小明',Age:'18',Message:'get请求返回',},});
    }else{
        res.send({Code: -1,Message:'get请求返回-用户名或密码错误',});
    }
});
// 路由级中间件(响应前端的POST请求)
router.post('/', (req, res) => {
    /*
        post 请求 为了安全会将参数放在请求体中传给后端，因此post请求的参数就放在请求体中的body内。
        通过 req.body 就能获取到参数，但是光这样写完并不好用，必须配置好中间件 （第三方库） req.body才能好用

        老版本的 express (4之前及4.几也算)
        获取post请求参数 需要下载第三方库（如 body-parser 模块）,
        然后导入（ const bodyParser=require('body-parser')） 注册( 通过app.use(bodyParser.json()) 解析的格式为：application/json)来获取post请求参数req.body 就可以好用了

        新版本 express 中 不需要外置去下载第三方的库，已经内置了但得需要配置中间件，
        但是配置必须要在响应之前,如当前login是先响应了应用级中间件(app.use('/login', LoginRouter);),
        匹配到进入login的路由中间件，因此 配置解析psot请求参数的中间件 需要放在应用级中间件(app.use('/login', LoginRouter);)之前，
        不然都匹配完了 配置的解析POST请求参数中间件 根本执行不到

        当前配置解析POST请求参数中间 案例在 index.js 中可见

    */
    let params= req.body;//必须配置中间件
    console.log('express-post请求获取参数==>',params);
    if(params && params.usename=='小明' && params.password == '123456'){
        res.send({Code: 0,Data:{Status: 0,Id:'f43245bd9824430b973fbf57320bb38b',UseName:'小明',Age:'18',Message:'post请求返回',},});
    }else{
        res.send({Code: -1,Message:'post请求返回-用户名或密码错误',});
    }
});
// 路由级中间件(响应前端的put，delete请求等等)
// router.put('/', (req, res) => {

// });
// router.delete('/', (req, res) => {

// });
// 如存在其他需求 如手机号返回的数据
router.get('/phone', (req, res) => {// 访问 ：http://localhost:4399/login/phone 即可返回数据
    res.send('/login-phone 数据');
});
 
// router.get('/favicon.ico',(req,res)=>{
//     res.send('/favicon.ico');
// })

module.exports = router;