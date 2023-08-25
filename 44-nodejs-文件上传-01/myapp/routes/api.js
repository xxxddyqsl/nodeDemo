var express = require('express');
var router = express.Router();
// 通过 uuid 模块 生成 唯一 ID 版本 1 是基于时间的 UUID，它使用随机数、日期时间值和设备的 MAC 地址的组合来生成通用唯一 ID。
const {v1: uuidv1 } = require('uuid')
//const {v4: uuidv4 } = require('uuid') console.log(uuidv4());
// console.log(uuidv1());
// 引入 multer 处理前端传入文件时 数据的编码格式："multipart/form-data"
const multer = require('multer');
/*
    方式1： 利用 multer 模块  在你的 本地文件夹 下 创建一个目标文件夹（如当前的： uploads 文件夹） 将来接收到的文件存放的地方，
    但是你需要在 app.js 中将生成的uploads文件夹配置 静态资源文件夹
*/
// const upload  = multer({dest:'uploads/'})
/*
    方式2： 利用 multer 模块  在你的 本地文件夹 下 创建一个目标文件夹（如'public/uploads/ ，在静态资源文件夹下创建 uploads 文件夹） 将来接收到的文件存放的地方，
    因为在 使用脚手架 快捷构建 Express 项目 express  myapp --view=ejs  （注释：创建基于ejs模板的应用骨架 之前学习的 模板文件是基于ejs模板 并且对前端相对友好），
    public 默认已经结束 静态资源文件夹了 所以此时并不需要再次配置。案例在 36-node-express-生成器 文件夹下的 express生成器说明.text 有说明文档
*/
const upload  = multer({dest:'public/uploads/'})

//C层 controller.js 负责处理请求业务逻辑
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');

// 具体业务分层详细说明 在 业务分层-介绍说明.text 文件夹中

// 用户：4个 子路由 响应 请求
//按 RESTful风格规范编写请求+响应接口 在 RESTful架构风格-介绍说明.text 文件中  可见详细说明

 // 按 和前端约定的 语义化规范 - post 请求为 更新 添加数据 照 RESTful风格规范 编写 api接口请求 - userController.addUser C层处理请求业务逻辑
// router.post('/user',userController.addUser)
/*
    post 请求为 更新 添加数据 - 多个中间件 案例在 29-node-express-基本路由\index.js 文件中可见
    router.post('/user',upload.single('avatar'),userController.addUser)
    upload.single('avatar') 为单个文件
    '/api/user'接口请求中存在文件 通过 增加中间件 upload.single('avatar')    并且 avatar （传入的文件字段名）前后端 必须核对好，
    因为后端需要通过该字段 （avatar）获取文件信息，获取文件存入'public/uploads/' 文件夹下 ，
    文件存好后 会自动 调用 next() 放行 直接执行 下一个中间件 userController.addUser ，此时 C层 userController.addUser 中则可以正常的接收 username age 等参数
    而 'public/uploads/' 文件夹下 有可以看到存入了 生成的永远不会重复的随机码，同时 multer 会在 req 中增加一个 file 属性（即存入的文件详细信息）

*/
router.post('/user',upload.single('avatar'),userController.addUser)
// 按照 和前端约定的 语义化规范 - put 请求为 修改数据 - RESTful风格规范 编写 api接口请求
// router.put('/user/:id',userController.UpdateUser)
/*
 put 请求为 修改数据 增加了文件上传 - 修改头像 - 可上传多个文件 array 
 
 upload.array('avatar') 为多个文件 - 无限制上传文件数量
 如果想要限制上传的数量 ：upload.array('avatar',5)最多5个文件

 其他说明解析 同上upload.single('avatar') 上传说明类似
*/
router.put('/user/:id',upload.array('avatar'),userController.UpdateUser)

// 按照 和前端约定的 语义化规范 - RESTful风格规范 编写 请求 - delete 请求为 删除数据
router.delete('/user/:id',userController.DeleteUser)
// 按照 和前端约定的 语义化规范 - RESTful风格规范 编写 请求 - get 请求为 删除数据
router.get('/user',userController.ListUser)

// 登录校验 - post请求 子路由 响应 请求
router.post('/login',loginController.login)
// 退出登录 - 销毁 session
router.get('/logout',loginController.logout)


// 导出 自定义 封装的接口
module.exports = router;