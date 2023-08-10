// fs 文件操作模块
const fs = require('fs');
// 删除文件夹 - 只能删除空的文件夹目录
fs.rmdir('./avatars', (err) => {
    console.log('rmdir=done==>',err)
    // 执行正确 err返回 null
     if(!err||err===null){
        console.log('rmdir=done==>删除文件夹成功')
     }else if(err.code==='ENOENT'){// 错误优先的回调函数
        console.log('rmdir=done==> avatars 文件夹不存在')
    }else if(err.code ==='ENOTEMPTY'){
        console.log('rmdir=done==> 删除的文件夹必须为空，文件夹下存在文件')
    }else{
        console.log('rmdir=done==>',err)
    }
})
