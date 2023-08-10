// 异步fs promises方式
const fs = require('fs').promises;
let path = './avatars';
//方式1：删除 avatars 文件夹目录 及 文件夹下的文件 简单的一级
// fs.readdir(path).then(async (data)=>{
//     let fileArr=[];
//      data.forEach(item=>{
//         let url = `${path}/${item}`;
//          //删除文件
//          fileArr.push(fs.unlink(url))
//     })
// 等待异步删除执行完成
//     await Promise.all(fileArr)
//     await fs.rmdir(path)
// }).catch(err=>{
//     console.log(err)
// })


//方式2：优化 删除 avatars 文件夹目录 及 文件夹下的文件 简单的一级
fs.readdir(path).then(async (data)=>{
    let fileArr=[];
    // 等待删除文件
    await Promise.all(data.map(item=> fileArr.push(fs.unlink(`${path}/${item}`))))
    await fs.rmdir(path)
}).catch(err=>{
    console.log(err)
})