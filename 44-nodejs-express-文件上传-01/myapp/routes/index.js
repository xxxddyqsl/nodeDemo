var express = require('express');
const JWT = require('../util/JWT');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 测试 - 生成token 及 过期时间 过期时间 (字符串类型 默认毫秒 1000*60 = 1分钟 1000*60*60=1小时 ，或'10s'=>10秒 或'1h'=>1小时  )
// let token = JWT.generate({name:'测试'},(1000*5).toString())
// console.log(token,JWT.verify(token))
// setTimeout(()=>{
//   console.log(JWT.verify(token))
// },6000)
module.exports = router;
