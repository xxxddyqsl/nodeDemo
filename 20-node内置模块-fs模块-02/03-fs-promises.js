// 异步fs promises方式
const fs = require('fs').promises;

// 异步读取文件
fs.readFile(
    './avatars/a.text',//文件夹路径 （相对路径或绝对路径都可以）
    'utf-8',//按什么格式读取文件,不写 默认格式为 Buffer (二进制数据)
).then(res=>{
    console.log(res);
}).catch(err=>{
    console.log(err);
});