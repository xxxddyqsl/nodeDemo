const fs = require('fs')
// 查看文件夹或文件的详细信息 和 查看是否是 文件或文件夹
fs.stat('./avatars',//文件夹路径 （相对路径或绝对路径都可以）
    (err, stats) => {
        if (!err) {
            console.log('stat=done==>成功查看文件夹信息', stats)
            console.log('stat=done==>是否是文件',stats.isFile())
            console.log('stat=done==>是否是文件夹目录',stats.isDirectory())
        } else if (err && err.code === 'ENOENT') {// 错误优先的回调函数
            console.log('stat=done==> a.text 文件不存在')
        } else {
            console.log('stat=done==>', err)
        }
    }
);
