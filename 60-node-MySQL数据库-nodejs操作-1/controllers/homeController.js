// C 层- 具体业务分层详细说明 在 业务分层-介绍说明.text 文件夹中 

// 导入- 封装的M层 model 操作数据库 ，并且给C 层 返回数据
const HomeModel = require('../model/homeModel')
// 封装-C层（controller层只负责处理请求业务逻辑 不涉及操作数据库）
const HomeController = {
    list: async (ctx, next) => {
        // 获取 get 请求 参数
        const { pageNum, pageSize } = ctx.query;
        // M层 model 操作数据库 并且返回数据
        const users = await HomeModel.listUser(pageNum, pageSize);
        // console.log(users)
        ctx.body = { Code: 0, Data: users[0] }
    },
    search: async (ctx, next) => {
        // 获取 get 请求 参数
        const {username,score} = ctx.query;

        const data = await HomeModel.searchUser(username,score);
        console.log(data)
        ctx.body = { Code: 0, Data: data[0] }
    },
    addUser: async (ctx, next)=>{
         // 获取 get 请求 参数
         const {username,score,gender,class_id} = ctx.query;
         const data = await HomeModel.addUser(username,score,gender,class_id)
         console.log(data)
         ctx.body = { Code: 0, Message: data[0].affectedRows==1&&'添加成功' }

    },
    deleteUser: async (ctx, next)=>{
        // 获取 get 请求 参数
        const {id} = ctx.query;
        const data = await HomeModel.deleteUser(id)
        console.log(data)
        ctx.body = { Code: 0, Message: data[0].affectedRows==1&&'删除成功' }

   },
}
module.exports = HomeController;