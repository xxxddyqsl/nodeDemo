// 引入 koa 路由模块
const Router = require('koa-router');
const promisePool = require('../../config/db.config');


// new 将路由模块 实例化
const router =new Router();
// get 请求 获取 数据
router.get('/', async (ctx,next)=>{ // 访问地址 http://localhost:4399/home
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
    let pageNum=1; // 第几页
    let pageSize=5;// 一页多少条数据
    // 解释说明： offset (pageNum-1)*pagesize 公式：(pageNum-1)*pagesize ，（ *pagesize 为 每一页 要跳过的多少条数据） 前端传入 pageNum = 1 为第一页 要跳过的数据 ，LIMIT pagesize 要 pagesize 条的数据
    const users= await promisePool.query(`select * from students order by class_id , score desc limit ${pageSize} offset ${(pageNum-1)*pageSize};`)

    console.log(users)
    //渲染 ejs模板页
    await ctx.render('home',{Code: 0,Data:users[0],Message:'测试'})
})
// 导出
module.exports = router;