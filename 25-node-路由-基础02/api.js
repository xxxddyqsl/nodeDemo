
// api.js 响应的接口 一些git或post 请求
function render(res,data,status,type=''){
    res.writeHead(status, // 设置头部 状态码   application/json 调用接口时的格式
        { "Content-Type": `${type?type:'application/json;'}charset=utf-8`
    });
    res.write(data);
    // 通知浏览器 传输结束
    res.end();
}
// 封装 api 接口
const apiRouter = {
    '/api/login':(res)=>{
        render(res,`{Code:0,data:{name:'login登录'}}`,200)
    }
};

// 导出
module.exports = apiRouter;