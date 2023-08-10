const fs = require('fs');

// 读取 文件内容
fs.readFile('./avatars/a.text',(err,data)=>{
    // data 为 Buffer (二进制数据)
     // 执行正确 err返回 null
    if(!err){
        // Buffer 二进制数据 转为  utf-8格式
        let str = data.toString('utf-8');
        console.log('readFile=done==>成功读取文件内容',data,str)
    }else if (err && err.code === 'ENOENT') {// 错误优先的回调函数
        console.log('readFile=done==> avatars文件夹不存在')
    } else {
        console.log('readFile=done==>', err)
    }
})

/*
    readFile('./avatars/a.text','utf-8' ,callback)
    readFile(path-路径,按什么格式读取文件,回调函数)
*/
fs.readFile(
    './avatars/a.text',//文件夹路径 （相对路径或绝对路径都可以）
    'utf-8',//按什么格式读取文件,不写 默认格式为 Buffer (二进制数据)
    (err,data)=>{//回调函数
     // 执行正确 err返回 null
    if(!err){ 
        console.log('readFile=done==>成功读取文件内容',data)
    }else if (err && err.code === 'ENOENT') {// 错误优先的回调函数
        console.log('readFile=done==> avatars文件夹不存在')
    } else {
        console.log('readFile=done==>', err)
    }
})