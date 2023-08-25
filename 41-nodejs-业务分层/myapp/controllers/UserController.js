// 具体业务分层详细说明 在 业务分层-介绍说明.text 文件夹中

// 导入- 封装的M层 model 操作数据库 ，并且给C 层 返回数据
const UserService = require("../services/UserService");

// 封装-C层（controller层只负责处理请求业务逻辑 不涉及操作数据库） controllers 文件夹下的 js 负责处理请求业务逻辑（把数据model 交给 视图 views）,把数据（如接口请求的参数）从前端拿到，并且数据在返回给前端（这个数据就是 从model M层 取到的数据）
const userController = {
    // C 层controller.js  负责处理请求业务逻辑 - addUser函数 更新添加 数据
    addUser: async (req,res)=>{// 接口请求参数获取说明 及 MongoDB使用   使用说明 案例在 ：39-node-MongoDB-nodejs操作数据库-1 可见详细说明
         // post 请求获取参数 --  C 层controller.js 把数据（如接口请求的参数）从前端拿到
        let {username,password,age}= req.body;
        // 先查询 username 是否存在重复 无重复创建 注册添加数据 -> data 从model M层 取到的数据 
        let data = await UserService.addUser(username,password,age);
        console.log('注册添加数据=>',data)
        if(data && data._id){
            // 注册成功-取出MongoDB生成的主键 _id 转为字符串 并且后端设置 cookie 值， 后面的请求 后端会获取校验 cookie 内的 _id
            res.cookie('_id',data._id.toString());
            //  C 层controller.js 把 从model M层 取到的数据data 返回给前端
            res.send({Code:0,Message:'注册成功',Data:{_id: data._id }})
        }else{
            res.send({Code:-1,Message:`注册失败=>${data}`})
        }
    },
    // C 层controller.js  分放业务给后端 要求后端修改数据库数据 并且取到后端返回的数据 - UpdateUser 函数 更新修改 数据
    UpdateUser: async (req,res)=>{
        // req.params 获取 :id 动态路由的 值 前端传入  C 层controller.js 把数据（如接口请求的参数）从前端拿到
        let _id = req.params.id;
        // put请求 获取 前端传入的参数  C 层controller.js 把数据（如接口请求的参数）从前端拿到
        let {username,password,age} = req.body;
        if(_id){
            //   C 层controller 分发业务 给M层 操作数据库 修改数据-> data 从model M层 取到的数据 
           let data = await UserService.UpdateUser(_id,username,password,age);
           console.log('修改数据2=>',data,)
            if(data&&data.acknowledged){
                 // C 层controller.js 把 从model M层 取到的数据 返回给前端
                res.send({Code:0,Message:'测试-update修改成功'})
            } else{
                res.send({Code:-1,Message:`update修改失败=>${data}`})
            }
        }
    },
     // C 层controller.js  分放业务给后端 要求后端修改数据库数据 并且取到后端返回的数据 - DeleteUser 函数 更新删除数据
    DeleteUser: async (req,res)=>{
       // req.params 获取 :id 动态路由的 值 前端传入  C 层controller.js 把数据（如接口请求的参数）从前端拿到
        let _id = req.params.id;
         // C 层controller 分发业务 给M层 操作数据库  删除数据-> data 从model M层 取到的数据 
        let data = await UserService.DeleteUser(_id);
        // console.log(data)
        if(data&&data.acknowledged){
              // C 层controller.js 把 从model M层 取到的数据 返回给前端
            res.send({Code:0,Message:'测试-删除成功'})
        }else{
              // C 层controller.js 把 从model M层 取到的数据 返回给前端
            res.send({Code:-1,Message:`删除失败=>${data}`})
        }
    },
     // C 层controller.js  分放业务给后端 要求后端修改数据库数据 并且取到后端返回的数据 - ListUser 函数 获取 users表内的用户列表数据
    ListUser: async (req,res)=>{
        // get 请求 获取参数 C 层controller.js 把数据（如接口请求的参数）从前端拿到 - pageNumber页码 pageSize每页多少数据
        let {pageNumber,pageSize} = req.query;
        //   C 层controller 分发业务 给M层 操作数据库  获取用户列表数据->  data 从model M层 取到的数据
        let data = await UserService.ListUser(pageNumber,pageSize)
        // console.log(data)
        if(data && data.list){
             // C 层controller.js 把 从model M层 取到的数据 返回给前端
            res.send({Code:0,Data:data})

        }else{
             // C 层controller.js 把 从model M层 取到的数据 返回给前端
            res.send({Code:-1,Message:`ListUser获取列表失败=>:${data}`})
        }
    },
}
// 导出
module.exports = userController