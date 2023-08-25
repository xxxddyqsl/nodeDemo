// 具体业务分层详细说明 在 41-nodejs-业务分层 ->业务分层-介绍说明.text 文件夹中

const LoginService = require("../services/LoginService");
const JWT = require("../util/JWT");

// 封装-C层（controller层只负责处理请求业务逻辑 不涉及操作数据库）
const LoginController = {
    login: async (req,res) => {
        let {username,password} = req.body;
        let data = await LoginService.login(username,password);
        console.log('login==>',data[0], typeof data[0])
        if(data.length===0){//账号密码 未查询到
            res.send({Code:-1,Message:'登录失败'})
        }else{
            /*
                jwt.sign 生成token 第一个参数必须为object类型 MongoDB数据库返回data[0]下 第一个参数 _id 类型不对（不是一个普通的object对象，复制类型的object对象）,
                因此使用 {...data[0]} -es6解构  或者 取出一些想要存入的数据 如{_id, username }
            */
            // const obj= {...data[0]}
            const obj= {_id:data[0].id,username:data[0].username}
             // 登录成功 生成token data[0]加密数据   过期时间-字符串类型(默认毫秒 1000*60 = 1分钟 1000*60*60=1小时 ，或'10s'=>10秒 或'1h'=>1小时 或 '1d'=>1天  )
            const token =JWT.generate(obj,(1000*60*5).toString());// 过期时间 5 分钟
            /*  建议：默认不成文的规范
                后端返回 token时 放在header中 如： res.header(自定义字段名，value) // 通常 token的 字段名为 authorization 如下
                设置 token 的 字段名 必须前后端 约定好 使用同一个字段 
                前端传入 token时 也是放在header中
            */
            res.header('authorization',token)
            console.log(token)
            res.send({Code:0,Message:'登录成功'})
        }

    },
    // 退出登录 - 销毁 session
    logout:(req,res)=>{
        // 销毁 session
    //     req.session.destroy(()=>{// 销毁成功 触发 回调
    //         // 销毁成功 - 给前端 返回数据
            res.send({Code:0,Message:'退出登录成功'})
    // });
    },
};
module.exports = LoginController