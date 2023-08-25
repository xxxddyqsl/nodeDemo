var express = require('express');
var router = express.Router();
// 通过 uuid 模块 生成 唯一 ID 版本 1 是基于时间的 UUID，它使用随机数、日期时间值和设备的 MAC 地址的组合来生成通用唯一 ID。
const {v1: uuidv1 } = require('uuid')
//const {v4: uuidv4 } = require('uuid') console.log(uuidv4());
// console.log(uuidv1());


//C层 controller.js 负责处理请求业务逻辑
const userController = require('../controllers/UserController');

// 具体业务分层详细说明 在 业务分层-介绍说明.text 文件夹中

// 4个 子路由 响应 请求
//按 RESTful风格规范编写请求+响应接口 在 RESTful架构风格-介绍说明.text 文件中  可见详细说明
 // 按 和前端约定的 语义化规范 - post 请求为 更新 添加数据 照 RESTful风格规范 编写 api接口请求 - userController.addUser C层处理请求业务逻辑
router.post('/user',userController.addUser)
// 按照 和前端约定的 语义化规范 - put 请求为 修改数据 - RESTful风格规范 编写 api接口请求
router.put('/user/:id',userController.UpdateUser)
// 按照 和前端约定的 语义化规范 - RESTful风格规范 编写 请求 - delete 请求为 删除数据
router.delete('/user/:id',userController.DeleteUser)
// 按照 和前端约定的 语义化规范 - RESTful风格规范 编写 请求 - get 请求为 删除数据
router.get('/user',userController.ListUser)

// 导出 自定义 封装的接口
module.exports = router;