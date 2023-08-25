var express = require('express');
var router = express.Router();
// 通过 uuid 模块 生成 唯一 ID 版本 1 是基于时间的 UUID，它使用随机数、日期时间值和设备的 MAC 地址的组合来生成通用唯一 ID。
const {v1: uuidv1 } = require('uuid')
//const {v4: uuidv4 } = require('uuid') console.log(uuidv4());
// console.log(uuidv1());
// MongoDB 数据库 - 引入 创建的 模型 使用  UserModel.create()创建添加方法 UserModel.find()查询方法、 UserModel.delete()方法、 UserModel.updateOne()更新修改匹配到的第一项 表内的数据方法 ， UserModel.updateMany()更新修改匹配到的多个
const UserModel = require('../model/UserModel');

//按 RESTful风格规范编写请求+响应接口 在 RESTful架构风格-介绍说明.text 文件中  可见详细说明

 // 按照 和前端约定的 语义化规范 - RESTful风格规范 编写 api接口请求 - post 请求为 更新 添加数据
router.post('/user',(req,res)=>{// 接口请求参数获取说明 及 MongoDB使用   使用说明 案例在 ：39-node-MongoDB-nodejs操作数据库-1 可见详细说明
        let {username,password,age}= req.body; // post 请求获取参数
        console.log(req.body)
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
            console.log('创建查询失败==>',err)
        })
})
// 按照 和前端约定的 语义化规范 - RESTful风格规范 编写 请求 - put 请求为 修改数据
router.put('/user/:id',(req,res)=>{
    // req.params 获取 :id 动态路由的 值 前端传入
    let uid = req.params.id;
    // put请求 获取 前端传入的参数
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
// 按照 和前端约定的 语义化规范 - RESTful风格规范 编写 请求 - delete 请求为 删除数据
router.delete('/user/:id',(req,res)=>{
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
// 按照 和前端约定的 语义化规范 - RESTful风格规范 编写 请求 - get 请求为 删除数据
router.get('/user',(req,res)=>{
    // get 请求 获取参数
    let {pageNumber,pageSize} = req.query;
  
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