// fs 文件操作模块
const fs = require('fs');
/*
    writeFile 会 覆盖之前的内容
    在某个文件夹下 某个文件（如果没有这个文件则会创建这个a.text） 写入这个文件的内容- hello world

    如果文件存在，写入的内容会覆盖之前的内容，之前的内容不会保留
*/
fs.writeFile(
    './avatars/a.text',//参数1：指定目录（相对路径或绝对路径）下 某个文件（这个文件可以没有，如果没有这个文件会创建）
    'hello world',//参数2：写入的内容-hello
    (err) => {
        // 执行正确 err返回 null
        if (!err || err === null) {
            console.log('writeFile=done==>成功写入内容')
        } else if (err && err.code === 'ENOENT') {// 错误优先的回调函数
            console.log('writeFile=done==> avatars文件夹不存在')
        } else {
            console.log('writeFile=done==>', err)
        }
    })