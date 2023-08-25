var express = require('express');
var router = express.Router();

/*
  关于 cookieParser() 模块的讲解使用
  cookie 是前后端 都可以设置 ，但实际的操作中 更多的是后端 进行 设置cookie+获取cookie，

  如：进行 Cookie、Session 登陆验证 的时候，后端 提前给 前端设置 一个cookie 和 一个Session的id，
  对应的前端拿着cookie 和 Session 进行 登陆验证 ，后端在读取 传入的cookie 和 Session，如果是对的 就 返回信息登录成功 等

  浏览器url 地址 http://localhost:3000/users 下  F12 控制台 设置 cookie 如：输出 document.cookie='age=18';document.cookie='name=小明'等 ，
  后端获取 前端设置的cookie
*/
/* GET users listing.  */
router.get('/', function(req, res, next) {//当前没有二级路径 （路径为 / ）， 请求地址：http://localhost:3000/users 即可 几级路径说明案例 在30-node-express-中间件下的 02-中间件-路由级中间件-01.js 可见说明
  // res.send('respond with a resource');
  // 经过app.use注册配置 第三方的cookieParser后 参数req是前端传来的参数 直接通过 req.cookies 读取前端的 cookie 值
  console.log('读取前端cookie值==>',req.cookies);
  // 后端设置 cookie 值， 通过参数 res （res是后端设置 如给前端返回数据 ，返回静态资源等）直接通过 res.cookie('参数key','参数val值') 需要在 res.send返回给前端之前设置
  res.cookie('city','苏州');// 浏览器 F12 查看  后端设置cookie 是否成功
  res.send({Code:0,Data:{name:'http://localhost:3000/users 接口请求成功'}});
});

module.exports = router;
