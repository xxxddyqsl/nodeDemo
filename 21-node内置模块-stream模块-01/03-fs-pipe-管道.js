const fs = require('fs');
/*
    前面学习了 可读流 createReadStream 和 可写流 createWriteStream，如果将这两个结合 一边读取流，一边写入流：
        问题1：如果一边读取的过快，另一边写入的太慢，会造成溢出，内容根本没有写完整
        问题2：如果一边读取的过慢，另一边写入的太快，会造成空闲

    解决方案：node 通过了 一个方法叫管道 ，可理解为直接把 可读流 和 可写流 中间连了一个管道，这边读取流 那边往里 写入流，自己来控制
    Stream流 的速度 通过pipe 方法控制 ，就不需要自己去担心 流速的问题

    应用场景：高性能的复制文件方法 - 比较适用于大文件的复制，比如将大文件创建可读流，通过可写流写到另一个文件中
*/
// 模拟 文件复制
//将文件创建可读流
const  readStream = fs.createReadStream('./test.json','utf-8',);

//将文件创建可写流 - 默认会覆盖test2.json文件内之前的数据 通过传入配置{flags:'a'} 为将可读流追加进去，
const writeStream = fs.createWriteStream('./test2.json');
//将文件创建可写流 - 通过传入配置{flags:'a'} 为将可读流追加进去
// const writeStream = fs.createWriteStream('./test2.json',{flags:'a'});

// 可读流 和 可写流 之前 连接管道pipe()  将可读流通过管道送到可写流中 ，传输完成之后会自己关闭管道

readStream.pipe(writeStream)