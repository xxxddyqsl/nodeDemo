// fs 文件操作模块 - 增删写等
const fs = require('fs');
// 修改文件夹名 将 avatars 文件夹名称修改为 avatar
fs.rename(
    './avatars',//参数1：原来文件夹名
    './avatar',//参数2：重命名的文件夹名
    (err) => {
        // 执行正确 err返回 null
        if (!err || err === null) {
            console.log('rename=done==>成功修改文件夹名')
        } else if (err && err.code === 'ENOENT') {// 错误优先的回调函数
            console.log('rename=done==> avatars文件夹不存在')
        } else {
            console.log('rename=done==>', err)
        }
    })