const query = require('querystring');
// url后的参数 form表单编码格式的字符串
const str = 'name=xiaoming&age=10&location=dalian';
// parse 函数 将form表单编码格式的字符串 解析为 对象结构
var obj = query.parse(str);
console.log(obj,obj.name);


var myObj={
    a:1,
    b:2,
    c:3,
}
// stringify 函数 将对象结构 解析 将form表单编码格式的字符串
var mystr = query.stringify(myObj);
console.log(mystr);

// 编码 - 将字符串中的一些特殊符号 转译
const str2 = 'id=3&city=北京&url=https://www.baidu.com';
const escapeStr=query.escape(str2)
console.log('escape()===>',escapeStr);
// 解码 -  将转译的字符串 在转译回去 
var unescapeStr = query.unescape(escapeStr)
console.log('unescape()===>',unescapeStr);