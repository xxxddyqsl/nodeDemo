var express = require('express');
var router = express.Router();
// 通过 uuid 模块 生成 唯一 ID 版本 1 是基于时间的 UUID，它使用随机数、日期时间值和设备的 MAC 地址的组合来生成通用唯一 ID。
const {v1: uuidv1 } = require('uuid')
//const {v4: uuidv4 } = require('uuid') console.log(uuidv4());
// console.log(uuidv1());
// MongoDB 数据库 - 引入 创建的 模型 使用  UserModel.create()创建添加方法 UserModel.find()查询方法、 UserModel.delete()方法、 UserModel.updateOne()更新修改匹配到的第一项 表内的数据方法 ， UserModel.updateMany()更新修改匹配到的多个
const UserModel = require('../model/UserModel')

// api - 注册 接口 /user 为二级路径 /register 为三级路径 请求访问路径为 http://localhost:4399/api/user/register
router.post('/user/register',(req,res)=>{
    //必须配置中间件 - app.js 中 通过 app.use(express.json()); 配置了中间件 因此可以获取 解析 post请求 （get请求同理需要配置） 参数 具体案例 31-node-express-获取请求参数 文件夹 可见
        let {username,password,age}= req.body;
        console.log(req.body)
        // console.log(params);
        /*
            将前端 传入的注册信息  插入 MongoDB 数据库
            1: 连接数据库 - 通过 安装 mongoose 模块 : yarn add mongoose
            2: 在 项目文件启动的地方 ( 在bin 文件夹 下的 www 文件 整个文件入口) 或者 在 app.js 中写也可以，
            当前是 单独做成了一个小模块（代码更加的规范） 创建了config 文件夹 创建 db.config.js 专门存放连接数据库代码 内部 写入 导入mongoose模块 并且 连接数据库 代码，
            并且在  www 文件中 引入db.config.js文件  进行连接 MongoDB 数据库

            3： 创建一个模型 ，模型需要 一 一对应数据库的 表（或集合 在MongoDB非关系型数据库中叫集合：collection ） 如：创建一个模型（user 可以限制filed类型 ），它就可以对应数据库的 表（或集合）叫 （users） 这个是有规律的（规律如：你传入的模型的名称 是 user ，对应的会加一个s 给你创建 users 集合 出来），
            去操作这个数据库，然后对应的 这个数据库的模型就会有相应的 方法 （如 UserModel.create()创建添加方法 UserModel.find()查询方法、 UserModel.delete()方法、 UserModel.updateOne()更新修改匹配到的第一项 表内的数据方法 ， UserModel.updateMany()更新修改匹配到的多个 ）

            注意：当前 创建 模型 并且限制模型的类型 单独做成了一个小模块（代码更加的规范）  是model 文件夹 （存放模型的文件夹） 的 在 UserModel.js 文件 中进行的

            4: 当前创建了一个 model 文件夹 专门存放 创建的模型，
            并且在 model 文件夹 下创建了一个 UserModel.js 在里面专门写 user 模型，
            因此 /user/register 接口请求触发之后 就需要使用这个 模型进行 增、 删、改、查

        */
        // 通过 UserModel.create()方法 创建添加 数据 - 将前端传入的信息 存在数据库
        //    UserModel.create({username,password,age}).then(data=>{
        //     // 创建添加数据 存入数据库 成功 后会触发 - 返回创建添加的数据
        //     /*
        //       打印如下：  {
        //         username: '小明',
        //         password: '123456',
        //         age: 13,
        //         _id: new ObjectId("64d4951ab2d77bf681acf2d3"),
        //         __v: 0
        //         }
        //     */
        //     console.log(data)
        //    }).catch(err=>{
        //      // 创建添加数据 存入数据库 失败触发 - 返回错误提示
        //     console.log(err)
        //    })
        // console.log()
        
        //  通过 find()方法 查询 users 表中 该username 是否存在 不存在 创建添加数据
        UserModel.find({username}).then(data=>{
            console.log('查询成功==>',data)
            if(data.length>0){// 该 用户名数据已存在 - 重复的username
                 // 给前端返回 - 注册失败 信息
                res.send({Code:-1,Message:'用户名已存在-请修改用户名'})
            }else{
                let uid = uuidv1();// 生成唯一id 返回给前端
                // 通过 create()方法  创建添加数据存入数据库 - 可通过 Robo3t 启动可视化工具 查看是否创建成功 或 
                UserModel.create({uid,username,password,age}).then(data=>{
                    console.log('创建添加成功==>',data,data._id)
                    // 注册成功-后端设置 cookie 值， 后面的请求 后端会获取校验 cookie 内的 uid
                    res.cookie('uid',uid);
                    // 给前端返回 - 注册成功 信息
                    res.send({Code:0,Message:'注册成功'})
                }).catch(err=>{
                    setError(err)
                    console.log('创建添加失败==>',err)
                })
            }
        }).catch(err=>{
            setError(err)
            console.log('查询失败==>',err)
        })
})
// api- 修改注册的 消息 接口 '/user/update/:id' :id 为动态路由配置-获取前端传入的 id  具体案例讲解：29-node-express-基本路由 文件夹中可见
router.post('/user/update/:id',(req,res)=>{
    // req.params 获取 :id 动态路由的 值 前端传入
    let uid = req.params.id;
    // 获取 前端传入的参数
    let {username,password,age}= req.body;
    console.log(req.body,uid)
    if(uid){
    // UserModel.updateOne() 如果数据库 集合中找到多项 匹配的 只会修改更新第一项, 而 UserModel.updateMany() 是会修改更新多个
    UserModel.updateOne({uid:uid},{$set:req.body}).then(data=>{
        // 修改更新成功- 触发回调
        console.log(data)
        res.send({Code:0,Message:'测试-update修改成功'})
    }).catch(err=>{
        console.log('update修改报错==>',err)
        setError(err)
    })
    }else{
        res.send({Code:-1,Message:'update修改失败=>uid:'+uid})
    }
})
// 删除个人信息
router.get('/user/delete/:id',(req,res)=>{
    // req.params 获取 :id 动态路由的 值 前端传入
    let uid = req.params.id;
    if(uid){
        // UserModel.deleteOne() 如果数据库 集合中找到多项 匹配的 只会删除第一项, 而 UserModel.deleteMany() 是匹配找到多项 会全部删除 多个
        UserModel.deleteOne({uid:uid}).then(data=>{
            // 删除成功- 触发回调
            console.log(data)
            res.send({Code:0,Message:'测试-删除成功'})
        }).catch(err=>{
            console.log('删除报错==>',err)
            setError(err)
        })
        }else{
            res.send({Code:-1,Message:'delete删除失败=>uid:'+uid})
        }
})
//获取列表 - 分页
router.post('/user/list',(req,res)=>{
    console.log(req.body)
    let {pageNumber,pageSize} = req.body
  
    // pageNumber = (pageNumber-1)*pageSize
    console.log((pageNumber-1)*pageSize,typeof pageSize)
    //  UserModel.find().count() 获取 users 表 数据总条数
    UserModel.find().count().then(len=>{
        // console.log('数据库-数据总条数=>',len)
        if(len>0){
            // 分页 获取数据 - 每次10条数据
            getPaging(res,pageNumber,pageSize,len)
        }
    }).catch(err=>{
        console.log('暂无数据==>',err)
        setError(err)
    })
})
function  getPaging(res,pageNumber,pageSize,len){
      //UserModel.find({},{__v:0}) 获取数据库 users 表 数据 过滤不要 __v 字段 0表示不要相关字段的数据 1表示要相关字段的数据 或者  UserModel.find({},['username','age','_id','uid'])传入数组 表示只要这些字段 也是可以的
    // 解释说明：sort({age:1})按照年龄进行排序（1 为正序 从小到大 -1为倒序 ） skip((pageNum-1)*pagesize) 公式：(pageNum-1)*pagesize ，（为 每一页 要跳过的多少条数据） 前端传入 pageNum = 1 为第一页 要跳过的数据 ，limit(pagesize) 要 pagesize 条的数据 具体说明 37-node-MongoDB-数据库-介绍 中 说明
    UserModel.find({},{__v:0,password:0}).sort({age:1}).skip(Number((pageNumber-1)*pageSize)).limit(pageSize).then(data=>{
        // 修改更新成功- 触发回调
        // console.log(data)
        res.send({Code:0,Data:{list:data,Total:len}})
    }).catch(err=>{
        console.log('查询失败==>',err)
        setError(err)
    })
}
function setError(err){
    res.send({Code:-1,Message:err})
}
// 导出 自定义 封装的接口
module.exports = router;