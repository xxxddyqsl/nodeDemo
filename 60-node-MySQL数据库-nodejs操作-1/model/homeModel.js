// 具体业务分层详细说明 在 业务分层-介绍说明.text 文件夹中

// 导入连接 mysql数据库  返回的变量 - 操作数据库
const promisePool = require('../config/db.config');

// 封装- M层 model 只操作数据库  C层 分配业务-  返回数据
// 当前文件夹 为M层 model 应该创建一个文件夹 model 专门存在处理  增、删、改、查 
const HomeModel = {
        listUser: async (pageNum, pageSize) => {
                /*
                        promisePool 注意返回值 是基于 promise 的因此是 异步 需要 async/await 等待 结果返回
                        使用方式 ： await promisePool.query(SQL语句) query() 是唯一操作SQL数据库的方法
                        注意sql语句-案例可见 ： 58-node-MySQL数据库-sql语句-01 + 59-node-MySQL数据库-sql语句-02

                        查询 students 表内的 数据

                        可见 控制台输出数据，数据是在 返回的数组 第 0 个数组 中 ，另一个数组是对这个表的字段具体描述，
                        如下 users ，要的 只是users[0]
                */
                // 查询 students 表内的 数据
                // const users= await promisePool.query('select * from students;')
                // 查询 students 表内的 数据 + 排序 (先 order by (从小到大) 按班级的class_id 排序，然后 desc (从大到小) 按分数 score 排序  ) +分页：limit (要几条数据) offset (跳过多少条数据)
                const users = await promisePool.query(`select * from students order by class_id,score desc limit ${pageSize} offset ${(pageNum - 1) * pageSize};`)
                // 解释说明： offset (pageNum-1)*pagesize 公式：(pageNum-1)*pagesize ，（ *pagesize 为 每一页 要跳过的多少条数据） 前端传入 pageNum = 1 为第一页 要跳过的数据 ，LIMIT pagesize 要 pagesize 条的数据

                return users;
        },
        searchUser: async (username,score)=>{
                console.log(username ,   score)
                //  联表查询 inner join （内连接）
                // 基础语法： select 别名A.列名 可设置别名,别名A.列名 ,别名B.列名 可设置别名  from 表名A 别名A inner join 表名B 别名B on  联表条件  where 过滤条件 and 可 连接 多个条件; 
                // 注意 ： s.name='${username}' 引号 需要保留在 否则 sql查询语句 不知道是字符串 会报错
                // 方式1： sql 查询  -通过字符串 模板拼接
                // const data = await promisePool.query(`select s.id sid, s.name sname,s.score,s.gender,s.class_id,c.name cname from students s inner join classes c on s.class_id=c.id where s.name='${username}' and s.score>60;`);

                 // 方式2： sql 查询 动态参数 - query(``,[]) 传入第二个参数-数组，数组第一位表示  第一个参数内的第一个 =? 的参数值（如 s.name=?） ，以此类推 数组第二位 就是 s.score>? 的值
                //  const data = await promisePool.query(`select s.id sid, s.name sname,s.score,s.gender,s.class_id,c.name cname from students s inner join classes c on s.class_id=c.id where s.name=? and s.score>? ;`,[''+username+'',score]);
                // SQL语句当查询条件为空时默认查询全部数据，不为空是则按照条件进行查询 1: s.name 使用 like 2：  字段>=条件1 or或 字段>=条件2   s.score>=? or s.score>=null 
                 const data = await promisePool.query(`select s.id sid, s.name sname,s.score,s.gender,s.class_id,c.name cname from students s inner join classes c on s.class_id=c.id where ( s.name like ? ) and ( s.score>=? or s.score>=null ) ;`,['%'+username+'%',score]);
                return data;
        },
        addUser: async (username,score,gender,class_id)=>{ // 添加 插入数据
                // 方式1： sql 查询  -通过字符串 模板拼接
                const data = await promisePool.query(`insert into students (name,score,gender,class_id) values ('${username}',${score},${gender},${class_id});`);
                // 方式2： sql 查询  -动态参数
                // const data = await promisePool.query(`insert into students (name,score,gender,class_id) values (?,?,?,?);`,[''+username+'',score,gender,class_id]);
                return data;
        },
        deleteUser: async (id)=>{
                //    基本语法：delete from 数据表名称 [where 删除条件]; delete from students where id=1;
                const data = await promisePool.query(`delete from students where id=${id}`);
                return data;
        }
}
module.exports = HomeModel;