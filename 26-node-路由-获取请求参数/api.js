
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
    '/api/login':(req,res)=>{// 响应 get请求
        // 提取传入的参数 - req中
        let Params = getParams(req);
        // 模拟查询 数据库 账号密码是否存在
        if(Params.usename === 'usexing' && Params.password ==='123456'){
            render(res,`{"Code":0,"data":{"message":"login登录成功"}}`,200)
        }else{
            render(res,`{"Code":1,"data":{"message":"登录失败，密码或账号不正确"}}`,200)
        }
    },
    '/api/loginpost':(req,res)=>{// 响应 post 请求
        // 封装 返回给前端的函数调用
       function callback(Params){
            console.log(Params)
            // 模拟查询 数据库 账号密码是否存在
            if(Params.usename === 'usexing' && Params.password ==='123456'){
                 // 给前端返回数据
                render(res,`{"Code":0,"data":{"message":"login登录成功"}}`,200)
            }else{
                render(res,`{"Code":1,"data":{"message":"登录失败，密码或账号不正确"}}`,200)
            }
       }
       // 提取传入的参数 - req中  传入回调函数收集完数据时触发
        postParams(req,callback);
    },
};
// 封装 get请求 获取url后的 参数
function getParams(req){
    const myURL  = new URL(req.url,'http://127.0.0.1');
    console.log(myURL)
    let obj = {};
    /*
        获取 url后的参数 返回URLSearchParams对象 （可以通过迭代器循环取出里面的值，返回的值类型为数组 ）如下使用方法：
    */
    //  obj 为数组
    // for(let obj of myURL.searchParams){console.log(obj)}
    // 可通过 es6的解构  获取 obj 为数组内的值
    for(let [key,value] of myURL.searchParams){
        obj[key]=value;
        console.log('searchParams==>',key,value);
    }
    console.log(obj)
    return obj;
    // 也可以 通过myURL.searchParams.get() 方法 获取指定的参数 返回
    // let usename = myURL.searchParams.get('usename');
}
// 封装 post请求 获取参数 传入回调函数收集完数据时触发
function postParams(req,callback){
    let postData = "";
    /*
        post请求获取传入的参数
        通过一种事件监听机制  一点点的传入参数
        因此需要监听  req.on('data' 事件 在data事件中通过回调函数给你传过来参数内容
        回调函数可能会执行多次 因此声明一个 postData = "" 空字符串 收集传入的参数内容
    */
    req.on('data',chunk=>{
        // 收集数据
        postData+=chunk;
    });
    // end 事件触发时 说明传输的参数 结束了 触发回调
    req.on('end',()=>{
        // 收集完 触发 
        console.log(postData);
        // json字符串 转 JSON 参数收集完 执行传入的回调函数
        callback(JSON.parse(postData));
    });
}
// 导出
module.exports = apiRouter;