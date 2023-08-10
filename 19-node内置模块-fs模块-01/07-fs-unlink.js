const fs = require('fs');
//删除文件
fs.unlink(
    './avatars/a.text',//文件夹路径 （相对路径或绝对路径都可以）
    (err) => {
        // 执行正确 err返回 null
        if (!err) {
            console.log('unlink=done==>成功删除文件',err)
        } else if (err && err.code === 'ENOENT') {// 错误优先的回调函数
            console.log('unlink=done==> a.text 文件不存在')
        } else {
            console.log('unlink=done==>', err)
        }
    }
)