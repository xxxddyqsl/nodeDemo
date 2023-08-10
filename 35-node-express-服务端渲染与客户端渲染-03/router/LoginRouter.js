// 路由级中间件写法 - 路由模块

const express = require('express');
// 获取 express 下的 Router() 路由方法
const router = express.Router();
// 服务端渲染页面 -  服务端渲染页面 可以直接访问 http://localhost:4399/login 后端渲染的页面login.ejs  或者 访问 ：http://localhost:4399/login?usename=小明&password=123456 后端渲染的页面login.ejs 传入参数
// http://localhost:4399/login get 请求后端渲染页面返回 login.ejs 及 数据
router.get('/', (req, res) => {
    let text =`
    <div><%  %> 流程控制标签 内部可以写js语句 如写（if else， for）也就是说 js语句需要 <%if(){%> <%}%>包住才可以</div>
    <div><%= %> 输出标签（原文输出HTML标签） 也就是 输出某个变量的值 如 <span><%=Code%></span> 输出的结果可能就是 <span>0</span><b>更加安全 不会执行标签或脚本 直接原文输出</b></div>
    <div><%- %> 输出标签（HTML会被浏览器解析） 如后端返回的数据 是一段代码片段 <%- %>会解析 输出为html</div>
    <div><%# %> 注释标签</div> 常规的注释如：<!--注释内容--> 在右键查看网页源码时会显示 因此常规的注释在无形中会增加文件体积  而<%# %>不会显示不会增加文件体积
    <div><%-include('user/show',(user.user)) %> 导入公共的模板内容（HTML会被浏览器解析）</div>
    `;
    let html =`<b>我是后端，返回的代码片段</b>`;
    // res 返回的几种方式：
    //1： res.send() 支持给浏览器返回 代码片段（如：res.send(`<div>测试</div>`)） + json 数据（如：res.send({Code: 0,Data:[{name:'测试'}],})）
    // 2： res.render() 仅支持 渲染模板 如 下方的 login.ejs
    // 3: res.json() 仅支持 JSON数据 如 res.json([11,22,33]); res.send({Code: 0,Data:[{name:'测试'}]}) 等
    // res.send('测试')
    // 服务端渲染页面 - 通过 res.render() 渲染模板页 返回给浏览器 res.render( "渲染的模板名（如：login）" , 传入的数据（如：{title:"login.ejs测试数据"}） )
    res.render("login",{Code: 0,Data:[{name:'测试-1',title:"login.ejs测试数据-1"},{name:'测试-2',title:"login.ejs测试数据-2"},{name:'测试-3',title:"login.ejs测试数据-3"}],myhtml:html,mytext:text})// 自动去找 views 下的渲染模板 login.ejs 因为在index.js中配置了 app.set("views","./views"); 渲染模板是在views文件目录
});
// post请求 login.ejs
 router.post('/validate',(req,res)=>{
    // post 获取参数 - 必须配置中间件 配置解析POST请求参数中间 案例在 index.js 中可见
    let params = req.body;
    console.log('express-post请求获取参数==>',params);
    let text =`
    <div><%  %> 流程控制标签 内部可以写js语句 如写（if else， for）也就是说 js语句需要 <%if(){%> <%}%>包住才可以</div>
    <div><%= %> 输出标签（原文输出HTML标签） 也就是 输出某个变量的值 如 <span><%=Code%></span> 输出的结果可能就是 <span>0</span><b>更加安全 不会执行标签或脚本 直接原文输出</b></div>
    <div><%- %> 输出标签（HTML会被浏览器解析） 如后端返回的数据 是一段代码片段 <%- %>会解析 输出为html</div>
    <div><%# %> 注释标签</div> 常规的注释如：<!--注释内容--> 在右键查看网页源码时会显示 因此常规的注释在无形中会增加文件体积  而<%# %>不会显示不会增加文件体积
    <div><%-include('user/show',(user.user)) %> 导入公共的模板内容（HTML会被浏览器解析）</div>
    `;
    let html =`<b>我是后端，返回的代码片段</b>`;
    if(params && params.usename == '小明'&& params.usepassword === '123456'){
        // res.render("home",[{Code:0,Data:[{id:'f43245bd9824430b973fbf57320bb38b',name:'小明'}]}])

        // 登录成功 - 与之前前后端分离不同的是 不能直接返回数据 页面会直接显示出数据 现在需要后端进行重定向到home页
        /*
            res.redirect(url地址) 当前需要进入home页 ,
            而请求的地址为 http://localhost:4399/login/validate 如果是./home （ validate同级的home但是并没有这个 ）那也就是 login（http://localhost:4399/login/home） 下的,
            我们需要访问根目录（ http://localhost:4399）下的home 因此 url路径为 ../home，请求访问的路径就变成了 http://localhost:4399/home

            同时（http://localhost:4399/home）请求需要在 homeRouter.js 中增加对应的接口 并且进行后端渲染 对应的 home.ejs 页面
        */
        //res.redirect 携带参数的方式 拼接在 url后
        // res.redirect("../home");// 不携带参数
        res.redirect("../home?id=f43245bd9824430b973fbf57320bb38b&name=小明");//携带参数
    }else{
        // console.log('登录失败');
        // 登录失败 重定向到login 或者 重新渲染 res.render("login",data)
        // res.redirect("/login");
        res.render("login",{Code: -1,Error:'post请求返回-login/validate登录接口返回账号密码错误- 重新渲染login.ejs',mytext:text,myhtml:html});
    }
   
 })


 router.get('/validate', (req, res) => {
    let text =`
    <div><%  %> 流程控制标签 内部可以写js语句 如写（if else， for）也就是说 js语句需要 <%if(){%> <%}%>包住才可以</div>
    <div><%= %> 输出标签（原文输出HTML标签） 也就是 输出某个变量的值 如 <span><%=Code%></span> 输出的结果可能就是 <span>0</span><b>更加安全 不会执行标签或脚本 直接原文输出</b></div>
    <div><%- %> 输出标签（HTML会被浏览器解析） 如后端返回的数据 是一段代码片段 <%- %>会解析 输出为html</div>
    <div><%# %> 注释标签</div> 常规的注释如：<!--注释内容--> 在右键查看网页源码时会显示 因此常规的注释在无形中会增加文件体积  而<%# %>不会显示不会增加文件体积
    <div><%-include('user/show',(user.user)) %> 导入公共的模板内容（HTML会被浏览器解析）</div>
    `;
    let html =`<b>我是后端，返回的代码片段</b>`;
      // get请求获取参数：之前老的案例是获取参数的方法是通过 new URL() 而 在express中 通过 req.query 获取 传入的参数
      let params= req.query;
    if(params && params.usename == '小明'&& params.usepassword === '123456'){
        // res.render("home",[{Code:0,Data:[{id:'f43245bd9824430b973fbf57320bb38b',name:'小明'}]}])

        // 登录成功 - 与之前前后端分离不同的是 不能直接返回数据 页面会直接显示出数据 现在需要后端进行重定向到home页
        /*
            res.redirect(url地址) 当前需要进入home页 ,
            而请求的地址为 http://localhost:4399/login/validate 如果是./home （ validate同级的home但是并没有这个 ）那也就是 login（http://localhost:4399/login/home） 下的,
            我们需要访问根目录（ http://localhost:4399）下的home 因此 url路径为 ../home，请求访问的路径就变成了 http://localhost:4399/home

            同时（http://localhost:4399/home）请求需要在 homeRouter.js 中增加对应的接口 并且进行后端渲染 对应的 home.ejs 页面
        */
        //res.redirect 携带参数的方式 拼接在 url后
        // res.redirect("../home");// 不携带参数
        res.redirect("../home?id=f43245bd9824430b973fbf57320bb38b&name=小明");//携带参数
    }else{
        // console.log('登录失败');
        // 登录失败 重定向到login 或者 重新渲染 res.render("login",data)
        // res.redirect("/login");
        res.render("login",{Code: -1,Error:'get请求返回-login/validate登录接口返回账号密码错误- 重新渲染login.ejs',mytext:text,myhtml:html});
    }
});
// 路由级中间件(响应前端的put，delete请求等等)
// router.put('/', (req, res) => {

// });
// router.delete('/', (req, res) => {

// });
// 如存在其他需求 如手机号返回的数据
router.get('/phone', (req, res) => {// 访问 ：http://localhost:4399/login/phone 即可返回数据
    res.send('/login-phone 数据');
});
 
module.exports = router;