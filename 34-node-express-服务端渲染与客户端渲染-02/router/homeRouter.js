// 路由级中间件写法 - 路由模块

const express = require('express');
const EmojiData = require('../test');
// 获取 express 下的 Router() 路由方法
const  router = express.Router();

 /*
    应用级中间件此处 app.use('/home', HomeRouter); '/home' 为一级匹配，匹配到 '/home' 后 进入路由中间件 进行二级路径匹配
    如'/' 是可以直接返回数据 如'/swiper'需要  http://localhost:4399/home/swiper 才能返回数据;
    总结：先匹配 应用级中间件的path路径一级路径匹配 app.use('/home', HomeRouter); 然后进入 路由中间件 匹配 path路径进行二级路径匹配 ，以此类推.

    想要在匹配到'/home' 就可以返回东西 那在路由中间件中 path路径 要写成'/' 需要二级路径没有东西才能 匹配到 '/home'如下：
    router.get('/',(req,res)=>{  res.send('/home');}); 访问  http://localhost:4399/home 即可

    如果在 路由中间件中 二级路径 path 在写一个'/home' 如： router.get('/home',(req,res)=>{  res.send('/home/home');}); 那就是  http://localhost:4399/home/home 才能访问到返回东西，
    但是这就不符合 访问http://localhost:4399/home 匹配到'/home' 就返回东西的需求

*/
// 路由级中间件写法 -  多个接口模块的体现。
router.get('/',(req,res)=>{// 访问 ：http://localhost:4399/home 即可返回数据
    // res.send('/home');

    // 后端login.ejs 登录成功重定向了 http://localhost:4399/home 后端渲染 home.ejs 页面
     // get请求获取参数：之前老的案例是获取参数的方法是通过 new URL() 而 在express中 通过 req.query 获取 传入的参数
     let params= req.query;
     console.log('login.ejs登录成功get请求获取参数==>',params);
    //  if(params.id == 'f43245bd9824430b973fbf57320bb38b'){

    //  }
    let text =`
    <div><%  %> 流程控制标签 内部可以写js语句 如写（if else， for）也就是说 js语句需要 <%if(){%> <%}%>包住才可以</div>
    <div><%= %> 输出标签（原文输出HTML标签） 也就是 输出某个变量的值 如 <span><%=Code%></span> 输出的结果可能就是 <span>0</span><b>更加安全 不会执行标签或脚本 直接原文输出</b></div>
    <div><%- %> 输出标签（HTML会被浏览器解析） 如后端返回的数据 是一段代码片段 <%- %>会解析 输出为html</div>
    <div><%# %> 注释标签</div> 常规的注释如：<!--注释内容--> 在右键查看网页源码时会显示 因此常规的注释在无形中会增加文件体积  而<%# %>不会显示不会增加文件体积
    <div><%-include('user/show',(user.user)) %> 导入公共的模板内容（HTML会被浏览器解析）</div>
    `;
    let html =`<b>我是后端，返回的代码片段</b>`;
    res.render('home',{Code: 0,Data:EmojiData,myhtml:html,mytext:text})
});
router.post('/list',(req,res)=>{// 访问 ：http://localhost:4399/home/list 即可返回数据
    // post 获取参数 - 必须配置中间件 配置解析POST请求参数中间 案例在 index.js 中可见
    let params = req.body;
    console.log('express-post请求获取参数==>',params);
    if(params && params.id == 'f43245bd9824430b973fbf57320bb38b'){
        res.send({Code: 0,Data:EmojiData,});
    }else{
        res.send({Code: -1,Message:'post请求返回-id错误',});
    }
});
// :id 必填 访问 ：http://localhost:4399/home/user/f43245bd9824430b973fbf57320bb38b 即可返回数据 案例 29-node-express-基本路由 中index.js 可见
router.get('/user/:id',(req,res)=>{
    res.send('/home/user/id - 返回个人数据');
});
// 如存在其他需求 如轮播返回的数据
router.get('/swiper',(req,res)=>{// 访问 ：http://localhost:4399/home/swiper 即可返回数据
    res.send('/home-swiper 数据');
});
router.get('/slide',(req,res)=>{// 访问 ：http://localhost:4399/home/slide 即可返回数据
    res.send('/home-slide 数据');
});

// router.get('/favicon.ico',(req,res)=>{
//     res.send('/favicon.ico');
// })

module.exports = router;