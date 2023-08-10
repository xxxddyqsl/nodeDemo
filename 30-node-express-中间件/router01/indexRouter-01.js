// 路由级中间件写法 - 路由模块

const express = require('express');
// 获取 express 下的 Router() 路由方法
const  router = express.Router();
// 路由级中间件写法
router.get('/',(req,res)=>{
    res.send('/');
});
router.get('/home',(req,res)=>{
    res.send('/home');
});
router.get('/login',(req,res)=>{
    res.send('/login');
});
// router.get('/favicon.ico',(req,res)=>{
//     res.send('/favicon.ico');
// })

module.exports = router;