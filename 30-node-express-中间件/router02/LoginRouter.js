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
// 路由级中间件写法 -  多个接口模块的体现。
router.get('/', (req, res) => {// 访问 ：http://localhost:4399/login 即可返回数据
    res.send('/login');
});
// 如存在其他需求 如手机号返回的数据
router.get('/phone', (req, res) => {// 访问 ：http://localhost:4399/login/phone 即可返回数据
    res.send('/login-phone 数据');
});
 
// router.get('/favicon.ico',(req,res)=>{
//     res.send('/favicon.ico');
// })

module.exports = router;