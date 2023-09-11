var express = require('express');
var router = express.Router();

/* GET users listing.   路由级组件- 渲染views下的 login.ejs 模板页*/
router.get('/', function(req, res, next) {
  // 经过app.use注册配置 第三方的cookieParser后 参数req是前端传来的参数 直接通过 req.cookies 读取前端的 cookie 值
  // console.log('读取前端cookie值==>',req.cookies);
  // 后端设置 cookie 值， 通过参数 res （res是后端设置 如给前端返回数据 ，返回静态资源等）直接通过 res.cookie('参数key','参数val值') 需要在 res.send返回给前端之前设置
  // res.cookie('city','苏州');// 浏览器 F12 查看  后端设置cookie 是否成功
  res.render('login', { title: 'Express' })
});

module.exports = router;
