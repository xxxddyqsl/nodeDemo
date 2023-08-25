// 具体业务分层详细说明 在 41-nodejs-业务分层 ->业务分层-介绍说明.text 文件夹中

const LoginService = require("../services/LoginService");

// 封装-C层（controller层只负责处理请求业务逻辑 不涉及操作数据库）
const LoginController = {
    login: async (req,res) => {
        let {username,password} = req.body;
        let data = await LoginService.login(username,password);
        console.log('login==>',data)
        if(data.length===0){//账号密码 未查询到
            res.send({Code:-1,Message:'登录失败'})
        }else{
            /*
                1：登录成功 返回 数据前 设置 session
                2：req.session 是一个对象 data[0] 是查询数据库返回的个人信息 是一个数组对象[{}]
                3：设置 session 对象， req.session.user= data[0] 挂载一个有效信息（如data[0]数据库返回的个人信息 ） ，
                当然你也可以随便设置一个布尔值 如 req.session.user= true，这里的req.session.user  user是 自定义增加的字段，
                你也可以写成a、b、c都可以， 只要你在校验  session 时 对应上就可以。
                校验session方式如下：
                    if( req.session.user) 即可
                校验  session 时 直接 判断 req.session 有没有你设置的 user这个属性就可以了

                注意： req.session 默认是存在 内存中（内存是：启动服务器时占用的） 当你改动代码 保存时 之前的 session 会丢，
                内存是：启动服务器时占的内存，每次保存重新启动服务器时 会释放掉node服务器之前占的内存，然后在重新启动新的服务器 占用新的内存
            */
            req.session.user = data[0];
            res.send({Code:0,Message:'登录成功'})
        }

    },
    // 退出登录 - 销毁 session
    logout:(req,res)=>{
        // 销毁 session
        req.session.destroy(()=>{// 销毁成功 触发 回调
            // 销毁成功 - 给前端 返回数据
            res.send({Code:0,Message:'退出登录成功'})
    });
    },
};
module.exports = LoginController