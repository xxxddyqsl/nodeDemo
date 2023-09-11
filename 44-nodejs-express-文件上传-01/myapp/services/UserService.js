// 具体业务分层详细说明 在 业务分层-介绍说明.text 文件夹中

// MongoDB 数据库 - 引入 创建的 模型 使用  UserModel.create()创建添加方法 UserModel.find()查询方法、 UserModel.deleteOne()方法、 UserModel.updateOne()更新修改匹配到的第一项 表内的数据方法 ， UserModel.updateMany()更新修改匹配到的多个
const UserModel = require('../model/UserModel');

// 封装- M层 model 只操作数据库  C层 分配业务-  返回数据
// 当前文件夹 为M层 model 应该创建一个文件夹 model 专门存在处理  增、删、改、查 ，但是当前因为 MongoDB 创建 访问数据库表的 限制模型的model文件夹，
// 因此另创建一个同语义化的 services 文件夹 来 负责 处理 M层 model 负责数据的 增、删、改、查，处理数据库
const UserService = {
    //  M层 操作数据库 - 更新添加 数据，return 返回 给C 层controller，C 层controller 在将数据model 交给 视图 views
    addUser: async ( username, password, age,avatar) => {
        // 需要 在 model文件夹下的 UserModel.js 中  增加 avatar 头像字段 模型的字段 否则存入不了 因为 模型的字段进行了限制 禁止任意存入字段
        // console.log('创建添加头像',avatar)
        //  先 等待 通过 find()方法 查询 users 表中 该username 是否存在 不存在 创建添加数据
        let query = await UserModel.find({ username }).catch(err=>{// 在此处 捕获处理 异常
                console.log('查询报错==>',err)
                return err
            });
        if(query.length<=0){
            // return 添加成功 返回 .then(data=>{}) 里的data 值 ，失败 返回 .catch(err)捕获的err异常常
            // 通过 create()方法  创建添加数据存入数据库 - 可通过 Robo3t 启动可视化工具 查看是否创建成功 或 命令行
           return UserModel.create({username,password,age,avatar}).catch(err=>{// 在此处 捕获处理 异常
                console.log('创建添加数据报错==>',err)
                return err;
            });
        }else{
            return {}
        }
        console.log('service',query)
    },
    // M层 操作数据库 - 更新修改 数据，return 返回 给C 层controller，C 层controller 在将数据model 交给 视图 views
    UpdateUser:async (_id,username,password,age,avatar)=>{ // avatar 头像地址 存入数据库
        // console.log('修改数据1=>',_id,username,password,age)
        // return 修改成功 返回 .then(data=>{}) 里的data 值 ，失败 返回 .catch(err)捕获的err异常
        // UserModel.updateOne() 如果数据库 集合中找到多项 匹配_id的 只会修改更新第一项, 而 UserModel.updateMany() 是会修改更新多多项
         return UserModel.updateOne({_id:_id},{$set:{username,password,age,avatar}}).catch(err=>{// 在此处 捕获处理 异常
            console.log(' 更新修改报错==>',err)
            return err
        });
    },
    // M层 操作数据库 - 删除数据，return 返回 给C 层controller，C 层controller 在将数据model 交给 视图 views
    DeleteUser: (_id)=>{
         // return 删除成功 返回 .then(data=>{}) 里的data 值 ，失败 返回 .catch(err)捕获的err异常
         // UserModel.deleteOne() 如果数据库 集合中找到多项 匹配_id的 只会删除更新第一项, 而 UserModel.deleteMany() 是会删除更新多项
        return  UserModel.deleteOne({_id:_id}).catch(err=>{// 在此处 捕获处理 return 返回异常
            console.log('删除报错==>',err)
            return err
        })
    },
    // M层 操作数据库 - 获取用户列表数据，return 返回 给C 层controller，C 层controller 在将数据model 交给 视图 views
    ListUser: async (pageNumber,pageSize)=>{
         // await 等待  UserModel.find().count() 异步执行完 返回 .then(data=>{}) 里的data 值 ，失败 返回 .catch(err)捕获的err异常
         // 先 等待  UserModel.find().count() 获取 users 表 数据总条数
         let len = await UserModel.find().count().catch(err=>{
            console.log('查询失败==>',err)
             return err;// 在此处 捕获处理 return 返回异常
        });
         // await 等待  UserModel.find().sort().skip().limit() 获取数据 异步执行完 返回 .then(data=>{}) 里的data 值 ，失败 返回 .catch(err)捕获的err异常
         // UserModel.find({},{__v:0}) 获取数据库 users 表 数据 过滤不要 __v 字段 0表示不要相关字段的数据 1表示要相关字段的数据 或者  UserModel.find({},['username','age','_id','uid'])传入数组 表示只要这些字段 也是可以的
         // 解释说明：sort({age:1})按照年龄进行排序（1 为正序 从小到大 -1为倒序 ） skip((pageNum-1)*pagesize) 公式：(pageNum-1)*pagesize ，（为 每一页 要跳过的多少条数据） 前端传入 pageNum = 1 为第一页 要跳过的数据 ，limit(pagesize) 要 pagesize 条的数据 具体说明 37-node-MongoDB-数据库-介绍 中 说明
        let data = await UserModel.find({},{__v:0,password:0}).sort({age:1}).skip(Number((pageNumber-1)*pageSize)).limit(pageSize).catch(err=>{
            console.log('查询失败==>',err)
            return err;// 在此处 捕获处理 return 返回异常
         })
        // 操作完 数据库 return 返回 给C 层controller，C 层controller 在将数据model 交给 视图 views
         return {list:data,Total:len}
    }
}
module.exports = UserService;