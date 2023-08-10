// fs 文件操作模块 - 增删写等
const fs = require('fs');
// 创建文件夹 - ./logs 相对路径在当前文件夹下创建一个logs文件夹 ( 也可以写绝对路径 )
fs.mkdir('./avatars',(err)=>{
    // 执行正确 err返回 null
    if(!err||err===null){
        console.log('mkdir=done==>成功创建文件夹')
     }else if(err&&err.code==='EEXIST'){// 错误优先的回调函数
        console.log('mkdir=done==> avatars 文件夹已经存在')
    }else{
        console.log('mkdir=done==>',err)
    }
})
