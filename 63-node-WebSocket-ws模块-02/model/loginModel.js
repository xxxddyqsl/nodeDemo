// 具体业务分层详细说明 在 业务分层-介绍说明.text 文件夹中

// 导入连接 mysql数据库  返回的变量 - 操作数据库
const promisePool = require('../config/db.config');

// 封装- M层 model 只操作数据库  C层 分配业务-  返回数据
// 当前文件夹 为M层 model 应该创建一个文件夹 model 专门存在处理  增、删、改、查 
const loginModel = {
    login: async (username, password) => {
        // 联表查询    inner join 方式 只能 查询出来 两个表 有关联性的的 数据 如 students 表内的name 和 users 表内的 name相同
        const data = await promisePool.query(`select * from students s inner join users u on s.name=u.name  where ( s.name=? ) and ( u.password=? ) ;`, [ username , password]);
        // 语句： select from 表名 别名 inner join（联表查询方式） on（条件）  where 过滤条件
        return data;
    },
    setData: async (fromName,msg,whereName='id')=>{// fromName 表名 msg 更新的内容 如果传入的 whereName 更新数据条件为 undefined或未传 使用设置 whereName 默认值 id
        // 基本语法：  update 数据表名称 set 字段1=更新后的值，字段2=更新后的值 ....where 更新条件;
        //  update students set name = '小黑',score = 90 where id = 4;
        // 更新的条件 必须存在
        if(!msg[whereName]){
            return;
        }
        // 更新条件
        let isWhere=null;
        let seNameV=[];
        // 提取 更新条件 + 更新的内容
        for(let key in msg){
            if(key == whereName){
                isWhere=`${key} = ${msg[key]}`
            }else{
                let val;
                if(typeof msg[key] == 'string'){
                    val = `'${msg[key]}'`
                }else{
                    val = msg[key];
                }
                seNameV.push(`${key} = ${val}`)
            }
        }
        // 修改设置表的数据
        const data = await promisePool.query(`update ${fromName} set ${seNameV.join()} where ${isWhere} ;`);
        return data;
    }
}
module.exports = loginModel;