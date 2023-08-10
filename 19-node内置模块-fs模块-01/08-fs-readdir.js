const fs = require('fs')
// 读取文件夹目录下存在的文件或文件夹
fs.readdir(
    './avatars',//文件夹路径 （相对路径或绝对路径都可以）
    (err,files) => {
        // files 为 文件夹下存在的文件或者文件夹
       // 执行正确 err返回 null
       if (!err) {
        console.log('readdir=done==>成功读取文件夹',files)
        } else if (err && err.code === 'ENOENT') {// 错误优先的回调函数
            console.log('readdir=done==> a.text 文件不存在')
        } else {
            console.log('readdir=done==>', err)
        }
    }
)