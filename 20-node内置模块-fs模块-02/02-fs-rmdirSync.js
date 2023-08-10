
// fs 文件操作模块 - 增删写等
const fs = require('fs');
/*
    不推荐使用 同步 :
        由于node环境执行的JavaScript代码是服务器端代码，所以，绝大部分需要在服务器运行反复执行业务逻辑的代码，必须是使用异步代码，
        否则同步代码在执行时期，服务器停止响应（其他人在使用时，接口请求都无法得到响应，必须等待同步代码执行完），因为JavaScript（单线程）只有一个执行线程。


    在服务器启动时如果需要读取配置文件，或者结束时需要写入到状态文件时，
    可以使用同步代码，因为这些同步代码只在启动和结束时执行一次，不影响服务器正常运行时的异步执行。
*/

/*

    注意选择使用同步 需要自己捕获报错，
    否则发生的报错（是基于系统报的错），这种报错 如果此时启动了一台server服务器会卡住 引发服务器宕机 ， 产生大问题，因此需要及时去捕获一下
*/
try {
    // 同步删除文件夹 - 同步会阻塞后面的代码执行。
    fs.rmdirSync('./avatars/a.text')
} catch (error) {
    console.log('rmdirSync==>', error)
}
/*
    19-node内置模块-fs模块-01文件下中每一个模块 都可以加上Sync
    如：
    fs.rmdirSync()
    fs.writeFileSync()
    fs.appendFileSync()
    fs.readFileSync()
    fs.unlinkSync()
    ...等
*/
