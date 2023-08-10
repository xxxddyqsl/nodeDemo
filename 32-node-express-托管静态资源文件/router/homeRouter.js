// 路由级中间件写法 - 路由模块

const express = require('express');
// 获取 express 下的 Router() 路由方法
const  router = express.Router();

 /*
    应用级中间件此处 app.use('/home', HomeRouter); '/home' 为一级匹配，匹配到 '/home' 后 进入路由中间件 进行二级路径匹配
    如'/' 是可以直接返回数据 如'/swiper'需要  http://localhost:4399/home/swiper 才能返回数据;
    总结：先匹配 应用级中间件的path路径一级路径匹配 app.use('/home', HomeRouter); 然后进入 路由中间件 匹配 path路径进行二级路径匹配 ，以此类推.

    想要在匹配到'/home' 就可以返回东西 那在路由中间件中 path路径 要写成'/' 需要二级路径没有东西才能 匹配到 '/home'如下：
    router.get('/',(req,res)=>{  res.send('/home');}); 访问  http://localhost:4399/home 即可

    如果在 路由中间件中 二级路径 path 在写一个'/home' 如： router.get('/home',(req,res)=>{  res.send('/home/home');}); 那就是  http://localhost:4399/home/home 才能访问到返回东西，
    但是这就不符合 访问http://localhost:4399/home 匹配到'/home' 就返回东西的需求

*/
// 路由级中间件写法 -  多个接口模块的体现。
router.get('/',(req,res)=>{// 访问 ：http://localhost:4399/home 即可返回数据
    res.send('/home');
});
// :id 必填 访问 ：http://localhost:4399/home/user/f43245bd9824430b973fbf57320bb38b 即可返回数据 案例 29-node-express-基本路由 中index.js 可见
router.get('/user/:id',(req,res)=>{
    res.send('/home/user/id - 返回个人数据');
});
// 如存在其他需求 如轮播返回的数据
router.get('/swiper',(req,res)=>{// 访问 ：http://localhost:4399/home/swiper 即可返回数据
    res.send('/home-swiper 数据');
});
router.get('/slide',(req,res)=>{// 访问 ：http://localhost:4399/home/slide 即可返回数据
    res.send('/home-slide 数据');
});

// router.get('/favicon.ico',(req,res)=>{
//     res.send('/favicon.ico');
// })

module.exports = router;