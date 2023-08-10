var express = require('express');
var router = express.Router();

// api - 注册接口 /user 为二级路径 /register 为三级路径 请求访问路径为 http://localhost:4399/api/user/register
router.post('/user/register',(req,res)=>{
    //必须配置中间件 - app.js 中 通过 app.use(express.json()); 配置了中间件 因此可以获取 解析 post请求 （get请求同理需要配置） 参数 具体案例 31-node-express-获取请求参数 文件夹 可见
        let params= req.body;
        console.log(params);
        /*
            将前端 传入的注册信息  插入 MongoDB 数据库
            1: 连接数据库 - 通过 安装 mongoose 模块 : yarn add mongoose
            2: 在 项目文件启动的地方 ( 在bin 文件夹 下的 www 文件 整个文件入口) 或者 在 app.js 中写也可以，
            当前是 自定义创建了config 文件夹 创建 db.config.js 内部 写入 导入mongoose模块 并且 连接数据库 代码，
            并且在  www 文件中 引入db.config.js文件  进行连接 MongoDB 数据库

            3： 创建一个模型 ，模型需要 一 一对应数据库的 表（或集合 在MongoDB非关系型数据库中叫集合：collection ） 如：创建一个模型（user 可以限制filed类型 ），它就可以对应数据库的 表（或集合）叫 （users） 这个是有规律的（规律如：你传入的模型的名称 是 user ，对应的会加一个s 给你创建 users 集合 出来），
            去操作这个数据库，然后对应的 这个数据库的模型就会有相应的 方法 （如 user.create()创建方法 、user.find()查询方法、user.delete()方法、user.update()更新修改表内的数据方法  ）

            4: 当前创建了一个 model 文件夹 专门存放 创建的模型，
            并且在 model 文件夹 下创建了一个 UserModel.js 在里面专门写 user 模型，
            因此 /user/register 接口请求触发之后 就需要使用这个 模型进行 增、 删、改、查

        */
        res.send({Code:0,Message:'测试 - 收到注册消息 '})
})
// 导出 自定义 封装的接口
module.exports = router;