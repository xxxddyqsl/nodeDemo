var express = require('express');
var router = express.Router();
/* GET home page.  路由级组件- 渲染views下的 home.ejs 模板页*/
router.get('/', function (req, res, next) {
  /*
    后端设置 session 的案例 在controllers文件夹下的loginController.js可见
    登录鉴权  判断 req.session对象 下有没有user字段（后端在登录成功时设置），
     req.session对象 下没有user字段，
    或 session过期时（之前设置的session下的user 过期会被销毁，因此req.session对象 下也会没有user字段）
    或 你手动在浏览器删除对应的钥匙（cookie：如 根据当前app.js内的session配置的name：xingSystem名  你找到浏览器 cookie内的 xingSystem 手动删除 ） ，

    都会 进行重定向到登录页 只有在登录成功之后并且session 未超过设置的过期时间( app.js内配置的过期时间 maxAge ) req.session.user才会存在
  */
  console.log(req.session)
  if (!req.session.user) { // 没有req.session.user
    // 重定向 进入登录页面
    res.redirect('/login')
  }

  res.render('home', { title: 'Express' });
});

module.exports = router;