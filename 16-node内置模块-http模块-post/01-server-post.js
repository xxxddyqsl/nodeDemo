const http = require('http');
const https = require('https');
const url = require('url');
const querystring = require('querystring');
http.createServer((req, res) => {
    var urlObject = url.parse(req.url, true);
    console.log(urlObject)
    switch (urlObject.pathname) {
        case '/api/use':
            /*
                响应头中writeHead() 设置 Content-Type：
                "Content-Type":"text/html; charset=utf-8" 浏览器会当做html 来加载展示
                "Content-Type":"text/plain" 浏览器会当做普通的文本 来加载展示
                "access-control-allow-origin":"*" //设置允许跨域的域名，*代表允许任意域名跨域
            */
            //  设置响应头: writeHead() 响应正文write()
            res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",//返回的为 json 数据
                // 设置 cors 头
                "access-control-allow-origin": "*",//设置允许跨域的域名，*代表允许任意域名跨域
            })
            /*
                nodejs 作为客户端 去小米优品取数据 （注： 服务器之间是没有跨域限制的） - 聚合开发
                cors 跨域问题，是浏览器的机制，而nodejs后端是不借助浏览器运行，所以没有跨域问题
            */
            // 方式1：传入res 收集完成之后 使用res.end(data) 返回给前端数据
            // http_post(res)
            // 方式2：传入匿名回调函数 收集完成之后 调用匿名函数 返回data 在使用res.end(data) 返回给前端数据
            http_post(function(data){
                res.end(data)
            })
            break;
        default:
            res.end('404');
            break;
    }

}).listen(4399, () => {
    console.log('OK,服务器创建成功-回调');
});
/*
    小米优品接口地址 -https://m.xiaomiyoupin.com/mtop/market/search/placeHolder
    https：由于 接口地址 为 https 所以需要用到 nodejs的内置https模块


   http： 如果 接口地址 为 http 需要用到 nodejs的内置http模块 get或者post 直接去访问地址获取数据（注： 服务器之间是没有跨域限制的）如下：
    http.get('http://localhost:8000/', (res) => {
    console.log(res)
    }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
    });
*/
// 方式1：post请求 传入res发送数据给前端
// function http_post(response) {
//     // 小米优品接口地址 
//     // var url = 'https://m.xiaomiyoupin.com/mtop/market/search/placeHolder';
//     var options ={
//         hostname:'m.xiaomiyoupin.com',// 请求地址的域名
//         port:'443',//端口号 443 就知道是http（http端口号默认是80） 还是 https （https端口号默认是443）了
//         path:'/mtop/market/search/placeHolder',// 请求的完整路径地址
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json; charset=utf-8"//传入的参数-数据类型
//         },
//     }
//     // 创建空字符串 收集 数据流
//     var data="";
//     /*
//         post 发送数据 是  https.request 返回一个对象(声明变量req),
//         通过这个对象req 来发送要传入的参数 req.write(JSON.stringify([{},{baseParam:{ypClient: 1}}]));req.end();
//     */
//    var req = https.request(options, (res) => {
//         // console.log(res);
//         // res 是一个 对象 需要自己监听，因为拿到的是数据流 data事件会被触发（数据流是一点点返回的，只要有数据流返回就会被触发）
//         res.on('data',(chunk)=>{
//             // chunk 二进制的数据
//             // 一点点 收集数据流 （二进制的数据）
//             data+=chunk;
//         })
//         // 所有的数据流 都接收到后 end事件会被触发 拿到所有的数据都合并在一起 是一个完整的数据
//         res.on('end',()=>{
//             // console.log(data);
//             // 接收完数据 - 返回给前端 -  告诉浏览器写完了 ，并且 返回一个 JSON字符串
//             callback(data);
//             response.end(data)
//         })
//     }).on('error', (e) => {
//         response.end(`Got error: ${e.message}`);
//         // console.error(`Got error: ${e.message}`);
//     })
//     // 传入的参数
//     req.write(JSON.stringify([{},{baseParam:{ypClient: 1}}]));
//     // 通知 传参结束
//     req.end();
// }

// 方式2：post请求 传入 回调函数  接收完数据调用回调函数传入数据
function http_post(callback) {
    // 小米优品接口地址 
    // var url = 'https://m.xiaomiyoupin.com/mtop/market/search/placeHolder';
    var options ={
        hostname:'m.xiaomiyoupin.com',// 请求地址的域名
        port:'443',//端口号 443 就知道是http（http端口号默认是80） 还是 https （https端口号默认是443）了
        path:'/mtop/market/search/placeHolder',// 请求的完整路径地址
        method:"POST",
        headers:{
            "Content-Type":"application/json; charset=utf-8",//传入的参数-数据类型-json字符串 - JSON.stringify([{},{baseParam:{ypClient: 1}}])
            // "Content-Type":"x-www-form-urlencoded",//扩展声明：另一种的参数-数据类型-form表单编码格式的字符串 - 'name=aa&id=cc&'
        },
    }
    // 创建空字符串 收集 数据流
    var data="";
    /*
        post 发送数据 是  https.request 返回一个对象(声明变量req),
        通过这个对象req 来发送要传入的参数 req.write(JSON.stringify([{},{baseParam:{ypClient: 1}}]));req.end();
    */
   var req = https.request(options, (res) => {
        // console.log(res);
        // res 是一个 对象 需要自己监听，因为拿到的是数据流 data事件会被触发（数据流是一点点返回的，只要有数据流返回就会被触发）
        res.on('data',(chunk)=>{
            // chunk 二进制的数据
            // 一点点 收集数据流 （二进制的数据）
            data+=chunk;
        })
        // 所有的数据流 都接收到后 end事件会被触发 拿到所有的数据都合并在一起 是一个完整的数据
        res.on('end',()=>{
            // console.log(data);
            // 接收完数据 - 返回给前端 -  告诉浏览器写完了 ，并且 返回一个 JSON字符串
            callback(data);
        })
    }).on('error', (e) => {
        callback(`Got error: ${e.message}`);
        // console.error(`Got error: ${e.message}`);
    })

    // req.write('name=aa&id=cc&');//扩展声明：另一种的参数-数据类型-form表单编码格式的字符串  "Content-Type":"x-www-form-urlencoded"

    // 发送 传入的参数  //传入的参数-数据类型 headers内声明了 "Content-Type":"application/json; charset=utf-8"
    req.write(JSON.stringify([{},{baseParam:{ypClient: 1}}]));
    // https.request必须 发送 通知 传参结束
    req.end();
}
