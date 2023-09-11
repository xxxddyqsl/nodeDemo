var express = require('express');
var router = express.Router();

/* GET users listing.   路由级组件- 渲染views下的 upload.ejs 模板页*/
router.get('/', function(req, res, next) {
  res.render('upload', { title: 'Express' })
});

module.exports = router;
