const http = require('http');
const https = require('https');
const url = require('url');
// cheerio 解析html 被称为服务端的 jquery
const cheerio = require('cheerio');

/*
    此用法 - 中层开发、转发服务器、聚合不同网站的几个接口于一身 统一对外界提供一个可以跨域访问的接口，这样就是一个开发的雏形

    nodejs 作为客户端 去小米优品取数据 （注： 服务器之间是没有跨域限制的） - 聚合开发
    cors 跨域问题，是浏览器的机制，而nodejs后端是不借助浏览器运行，所以没有跨域问题
*/
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
            let date=new Date();
            res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8",//返回的为 json 数据
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
                // 
                res.end(spider(data));
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
    猫眼电影口地址 -'https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E8%8B%8F%E5%B7%9E&ci=80&channelId=4';
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
//     // 猫眼电影口地址 
//     // var url = 'https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E8%8B%8F%E5%B7%9E&ci=80&channelId=4';
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


/*
    此用法 - 中层开发、转发服务器、聚合不同网站的几个接口于一身 统一对外界提供一个可以跨域访问的接口，这样就是一个开发的雏形

    nodejs 作为客户端 去小米优品取数据 （注： 服务器之间是没有跨域限制的） - 聚合开发
    cors 跨域问题，是浏览器的机制，而nodejs后端是不借助浏览器运行，所以没有跨域问题
*/
// 方式2：post请求 传入 回调函数  接收完数据调用回调函数传入数据
function http_post(callback) {
    // 猫眼电影口地址 获取此网站的页面数据 - 爬虫
    // var url = 'https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E8%8B%8F%E5%B7%9E&ci=80&channelId=4';
    var options ={
        hostname:'i.maoyan.com',// 请求地址的域名
        port:'443',//当前请求的地址是https 所以端口号 443 就知道是http（http端口号默认是80） 还是 https （https端口号默认是443）了
        // path:'/mtop/market/search/placeHolder',// 请求的完整路径地址
        path: '/',
        method:"GET",
        headers:{
            "Content-Type":"text/html; charset=utf-8",//传入的参数-数据类型-json字符串 - JSON.stringify([{},{baseParam:{ypClient: 1}}])
        //     // "Content-Type":"x-www-form-urlencoded",//扩展声明：另一种的参数-数据类型-form表单编码格式的字符串 - 'name=aa&id=cc&'
            "Cache-Control":"no-cache,must-revalidate",
            "Connection":"keep-alive",
                // "Date":date.toString(),
                "Set-Cookie":
                "from=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.maoyan.com; secure",
                "Set-Cookie":
                "from=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.maoyan.com; secure",
                "Set-Cookie":
                "from=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure",
                "Set-Cookie": 
                "from=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure",
                "Transfer-Encoding":
                "chunked",
                "X-Content-Encoding-Over-Network":
                "gzip",
        },
        agent: false,
    }
   
    // 创建空字符串 收集 数据流
    var data="";
    /*
        post 发送数据 是  https.request 返回一个对象(声明变量req),
        通过这个对象req 来发送要传入的参数 req.write(JSON.stringify([{},{baseParam:{ypClient: 1}}]));req.end();
    */
    var req = https.request(options, (res) => {
         // res.sendDate：默认是true。是否自动设置Date头部。（按HTTP协议是必须要的，除非是调试用，不然不要设置为false）
            // 设置 header头部 Date  否则请求多次可能会返回302 说明请求多次需要验证 或刷新验证下原网站
            res.sendDate=true;

        // console.log(res);
        // res 是一个 对象 需要自己监听，因为拿到的是数据流 data事件会被触发（数据流是一点点返回的，只要有数据流返回就会被触发）
        res.on('data',(chunk)=>{
            // chunk 二进制的数据
            // 一点点 收集数据流 （二进制的数据）
            data+=chunk;
        })
        // 所有的数据流 都接收到后 end事件会被触发 拿到所有的数据都合并在一起 是一个完整的数据
        res.on('end',()=>{
            console.log(data);
            // 接收完数据 - 返回给前端 -  告诉浏览器写完了 ，并且 返回一个 JSON字符串
            callback(data);
        })
    }).on('error', (e) => {
        callback(`Got error: ${e.message}`);
        // console.error(`Got error: ${e.message}`);
    })

    // req.write('name=aa&id=cc&');//扩展声明：另一种的参数-数据类型-form表单编码格式的字符串  "Content-Type":"x-www-form-urlencoded"

    // 发送 传入的参数  //传入的参数-数据类型 headers内声明了 "Content-Type":"application/json; charset=utf-8"
    // req.write(JSON.stringify([{},{baseParam:{ypClient: 1}}]));
    // https.request必须 发送 通知 传参结束
    req.end();
}
// 解析 爬虫获取到的 html - 收集页面数据
function spider(data){
    // 通过 cheerio.load()方法 将原始数据传入 按照dom结构进行解析
    const $ = cheerio.load(data);
    // 传入class或id（类似jq的用法） 返回dom树
    let $moviewList= $('.column.content');
    let moives=[];
    // 筛选数据
    $moviewList.each((index,value)=>{
        // 获取页面数据 指定class 内容
        let title = $(value).find('.title').text();
        let grade= $(value).find('.grade').text();
        let actor = $(value).find('.actor').text();
        moives.push({title,grade,actor});
    })
    console.log( moives );
    // 打印输出 收集的页面数据
    // [
    //     { title: '速度与激情10', grade: '8.9', actor: '主演:范·迪塞尔,米歇尔·罗德里格兹,杰森·莫玛' },
    //     { title: '人生路不熟', grade: '9.4', actor: '主演:乔杉,范丞丞,马丽' },
    //     { title: '温柔壳', grade: '9.1', actor: '主演:王子文,尹昉,咏梅' },
    //     { title: '天空之城', grade: '', actor: '主演:田中真弓,横泽启子,初井言荣' },
    //     { title: '银河护卫队3', grade: '9.3', actor: '主演:克里斯·帕拉特,佐伊·索尔达娜,戴夫·巴蒂斯塔' },
    //     { title: '哆啦A梦：大雄与天空的理想乡', grade: '', actor: '主演:哆啦A梦,大雄,水田山葵' },
    //     { title: '请别相信她', grade: '9.0', actor: '主演:章若楠,吴昱翰,吴彦姝' },
    //     { title: '小美人鱼', grade: '7.9', actor: '主演:海莉·贝利,乔纳·豪尔·金,戴维德·迪格斯' },
    //     { title: '蜘蛛侠：纵横宇宙', grade: '', actor: '主演:沙梅克·摩尔,彭昱畅,海莉·斯坦菲尔德' },
    //     { title: '长空之王', grade: '9.6', actor: '主演:王一博,胡军,于适' },
    //     { title: '灌篮高手', grade: '9.3', actor: '主演:宫城良田,三井寿,流川枫' },
    //     { title: '刀剑神域进击篇：暮色黄昏', grade: '8.5', actor: '主演:松冈祯丞,户松遥,井泽诗织' }
    // ]
    // 返回 筛选出来的数据
    return JSON.stringify(moives);
}