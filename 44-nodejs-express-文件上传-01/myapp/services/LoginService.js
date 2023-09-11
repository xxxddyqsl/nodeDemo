// 具体业务分层详细说明 在 41-nodejs-业务分层 ->业务分层-介绍说明.text 文件夹中

const UserModel = require('../model/UserModel')

// 当前 M 层 操作数据库
const LoginService = {
    login: (username,password) => {
        // find 查询 数据库 账号密码 是否存在 且有权限 1要相关字段的数据 0表示不要相关字段的数据
       return UserModel.find({username,password},{password:0}).catch(err=>{
        return err
       })
    },
}
module.exports = LoginService;