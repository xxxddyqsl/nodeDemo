// 连接数据库

// mongoose - 连接  MongoDB 数据库 模块
const mongoose = require('mongoose')
/*
    通过 mongoose 提供的 connect() 方法进行连接
    注意 mongodb:// 是固定值 ,
    127.0.0.1  是回送地址,指的是本机的 域名IP地址,
    27017      是端口号 而mongodb的服务端 默认端口号 就是27017
    /xingxin_project 是 数据库的名 比如之前 创建测试使用的 xingxin_test 数据库

    
*/
mongoose.connect('mongodb://127.0.0.1:27017/xingxin_koa');
// 注意 目前还没有 创建 xingxin_project 数据库 但是能够 直接连接并创建好 xingxin_project 数据库, 前提是你往里面插入 表（集合）和数据，数据库 xingxin_test 会自动创建
// 当然 如果连接的服务器 地址写错了如（'mongodb://127.0.0.1:2717/xingxin_project'） 等一会 终端也会出现报错 也会出现 错误提示 如 服务器连接超时 等