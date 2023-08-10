const http= require('http');
const url = require('url')
// 解决接口异步返回
const EventEmitter= require('events');
const https = require('https')
var event = null;
 // 猫眼接口地址
//  var url = 'https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E8%8B%8F%E5%B7%9E&ci=80&channelId=4';
const options={
        hostname:'i.maoyan.com',// 请求地址的域名
        port:'443',//端口号 443 就知道是http（http端口号默认是80） 还是 https （https端口号默认是443）了
        path:'/api/mmdb/movie/v3/list/hot.json?ct=%E8%8B%8F%E5%B7%9E&ci=80&channelId=4',// 请求的完整路径地址
        method:"get",
        headers:{
            // "Content-Type":"application/json; charset=utf-8",//传入的参数-数据类型-json字符串 - JSON.stringify([{},{baseParam:{ypClient: 1}}])
            "Content-Type":"x-www-form-urlencoded",//扩展声明：另一种的参数-数据类型-form表单编码格式的字符串 - 'name=aa&id=cc&'
        },
}
http.createServer((req,res)=>{
    var urlObject = url.parse(req.url, true);
    console.log(urlObject)
    switch (urlObject.pathname) {
        case '/api/use':
            res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",//返回的为 json 数据
                // 设置 cors 头
                "access-control-allow-origin": "*",//设置允许跨域的域名，*代表允许任意域名跨域
            });
            // 每次 重新 生成一个全新的event对象 否则之前的监听不会销毁，并且会重新创建on 监听事件 play 造成多个play事件
            event = new EventEmitter();
           // 发布事件 - 通过 on 监听事件 play 监听的关键字
            event.on('play',(data)=>{
                // res.write(data);
                // console.log(data)
                res.end(data);
            })
            http_get();
            break;
        default:
            res.end('404');
            break;
    }

}).listen(4399,()=>{
    console.log('ok,server')
})
function http_get(){
    let data='';
    let req=https.request(options,(res)=>{
        res.on('data',(chunk)=>{
            // 字符串 - 收集数据流 （二进制的数据）
            data+=chunk
        });
        res.on('end',()=>{
            // console.log(data);
            // 通过 emit 触发on 事件 play 监听的关键字 类似订阅事件
            event.emit('play',data)
        })
    })
      // 发送 传入的参数  //传入的参数-数据类型 headers内声明了 "Content-Type":"application/json; charset=utf-8"
    //   req.write(JSON.stringify([{ct: '苏州',  ci: 80, channelId: 4},]));
      // https.request必须 发送 通知 传参结束
      req.end();
}