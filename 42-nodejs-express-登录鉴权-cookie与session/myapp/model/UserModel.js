// 引入 mongoose 模块
//  mongoose 模块 只要 在前面 www 文件内 自动执行 连接成功 ，这里的 mongoose 再次引入 是同一个对象，因此这里的mongoose 已经具备了那个连接了 而不是一个新的实例
const mongoose = require('mongoose')
/*
    因为 MongoDB 太自由了 需要进行 一定的限制 ：在 37-node-MongoDB-数据库-介绍 的文件中 记录的 7-3 有详情说明

    自定义 创建 限制 模型的字段 （数量 ）+ 值 类型
    如：
    1：限制字段：规定 的字段为 uid (uid 是后端生成存入数据库 并且返回给前端) , username ， age ， password 并且 域的长度 只能有这3个字段 字段名必须一致
    2：限制值的类型：  username的值类型 必须是 String 类型 ， age 的值类型 必须是 Number 类型 ， password 必须是 String 类型

*/
const userType = {
    uid:String,
    username:String,
    password:String,
    age:Number,
}
/*
    创建模型的方法：mongoose.model()
    1: 第一个参数： 传入这个模型的名称 user,
    注意模型user 将会对应 数据库中 users 这个表 （或集合 MongoDB中 叫做集合），一开始 这个 users 集合并没有创建出来 ，
    当执行完  mongoose.model('user') 时这个users 集合就会被创建出来，
    规律如：你传入的模型的名称 是 user ，对应的会加一个s 给你创建 users 集合 出来

    2: 第二个参数：限制 模型的字段 （数量 ）+ 值 类型 上方 自定义创建的 userType 对象
     new mongoose.Schema(userType) 通过 new mongoose 下的Schema()方法传入 自定义创建的 userType 对象 进行限制

    因此 users 集合中 只能存入 uid (uid 是后端生成存入数据库 并且返回给前端) , username ， age ， password 这3个字段 多了存不下 并且 值的类型 也必须是规定好的的部分

    3：当前测试案例 在 api.js 中 定义的 '/user/register' 接口 内
*/
const UserModel = mongoose.model('user',new mongoose.Schema(userType));

// 导出 创建的 模型user, 注意 导出的模型user 将会对应 users 这个表 （或集合 MongoDB中 叫做集合）
module.exports = UserModel;