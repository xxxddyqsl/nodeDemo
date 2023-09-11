// 引入 koa 路由模块
const Router = require('koa-router')

// new 将路由模块 实例化
const router =new Router();
const EmojiData = require('../../test')

/*
 在 index.js 入口文件 中 当前路由模块 被注册成了 路由级中间件 ，并且 path 一级路径 为'/home',
 
 因此当前 homes 文件夹下index.js  封装的 路由为二级路径  想要通过 http://localhost:4399/home/ 此二级路径就不需要写然后东西了
 除非 需要二级路径 
*/

// 请求写法1：常规的写法 

// get 请求 获取 数据
router.get('/', async (ctx,next)=>{  // 请求路径 ：http://localhost:4399/home/  请求方式： get
       let text =`
       <div><%  %> 流程控制标签 内部可以写js语句 如写（if else， for）也就是说 js语句需要 <%if(){%> <%}%>包住才可以</div>
       <div><%= %> 输出标签（原文输出HTML标签） 也就是 输出某个变量的值 如 <span><%=Code%></span> 输出的结果可能就是 <span>0</span><b>更加安全 不会执行标签或脚本 直接原文输出</b></div>
       <div><%- %> 输出标签（HTML会被浏览器解析） 如后端返回的数据 是一段代码片段 <%- %>会解析 输出为html</div>
       <div><%# %> 注释标签</div> 常规的注释如：<!--注释内容--> 在右键查看网页源码时会显示 因此常规的注释在无形中会增加文件体积  而<%# %>不会显示不会增加文件体积
       <div><%-include('user/show',(user.user)) %> 导入公共的模板内容（HTML会被浏览器解析）</div>
       `;
       let html =`<b>我是后端，返回的代码片段</b>`;
       /*
       自动找 views 文件夹下的 home.ejs 模板页面
       注意  ctx.render 是异步读取并且渲染文件  因此需要通过 async/await 等待
    */

   // koa 获取 cookie 
   console.log(ctx.cookies.get('_id'))
    // koa 设置 cookie - 包含中文 需要 通过 encodeURI 进行编码 否则报错 这个cookie 前端是无法获取的 只能在前后端传输的时候 获取到
   ctx.cookies.set('name',encodeURI('123小明'))
   console.log(ctx.cookies.get('name'))
   await ctx.render('home',{Code: 0,Data:EmojiData,myhtml:html,mytext:text})
})
router.get('/list', async(ctx,next)=>{

   ctx.body={Code:0,Data:[
      {_id:'a',username:'aaa',age:10},
      {_id:'b',username:'bbb',age:11},
      {_id:'c',username:'ccc',age:12},
   ]}
})
// 导出
module.exports = router;