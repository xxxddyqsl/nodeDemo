// 引入 mongoose 模块
//  mongoose 模块 只要 在前面 www 文件内 自动执行 连接成功 ，这里的 mongoose 再次引入 是同一个对象，因此这里的mongoose 已经具备了那个连接了 而不是一个新的实例
const mongoose = require('mongoose')
// 自定义 创建 限制 模型的字段 （数量 ）+ 值 类型
const userType = {
    username:String
}
/*
    mongoose 下有一个 model() 创建模型的方法 传入这个模型的名称 user,
    注意模型user 将会对应 数据库中 users 这个表 （或集合 MongoDB中 叫做集合），一开始 这个 users 集合并没有创建出来 ，
    当执行完  mongoose.model('user') 时这个users 集合就会被创建出来，
    规律如：你传入的模型的名称 是 user ，对应的会加一个s 给你创建 users 集合 出来
*/
const UserModel = mongoose.model('user');

// 导出 创建的 模型user, 注意 导出的模型user 将会对应 users 这个表 （或集合 MongoDB中 叫做集合）
module.exports = UserModel;