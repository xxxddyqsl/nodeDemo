// fs 文件操作模块
const fs = require('fs');
/*
    appendFile 会保留之前的内容 新的内容是追加进去
    在某个文件夹下 某个文件（如果没有这个文件则会创建这个a.text） 写入这个文件的内容- hello world

    如果文件存在，写入的内容不会覆盖之前的内容，之前的内容会保留，只是将新的内容追加进去
*/
fs.appendFile(
    './avatars/a.text',//参数1：指定目录（相对路径或绝对路径）下 某个文件（这个文件可以没有，如果没有这个文件会创建）
    '\n 你好',//参数2：写入的内容(\n 你好)  \n 为转译的换行
    (err)=>{
         // 执行正确 err返回 null
         if (!err || err === null) {
            console.log('appendFile=done==>成功追加内容')
        } else if (err && err.code === 'ENOENT') {// 错误优先的回调函数
            console.log('appendFile=done==> avatars文件夹不存在')
        } else {
            console.log('appendFile=done==>', err)
        }
})
