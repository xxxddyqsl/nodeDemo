//  webSocket 响应
// 导入 ws 模块
const {WebSocket,WebSocketServer} = require('ws');
// const  WebSocketServer = webSocket.WebSocketServer;
// 创建 socket服务器
const SocketServer = new WebSocketServer({port:8080});
// 监听 有客户端连接时 触发
SocketServer.on('connection', function (ws) {
    // 收到 客户端发送过来的消息
    ws.on('message', function message(data) {
        console.log('received: %s',data)

        // 收到某个客户端发送过来的 消息 转发给其他客户端 - 广播功能 - 遍历每一个客户端
        SocketServer.clients.forEach(function each(client){
            console.log(WebSocket.OPEN)
            // client != ws 不等于自己 并且其他的 各个客户端是否还保持着 连接中的状态， client.readyState 遍历每个客户端的连接状态 ， WebSocket.OPEN 连接中的状态
            if( client != ws && client.readyState === WebSocket.OPEN ){
                // {binary:isBinary} 表示发的数据格式 是否 是以 二进制的格式
                client.send(data,)
            }
        })
    })

    ws.on('error', console.error);

    // ws.on('message', function message(data) {
    //   console.log('received: %s', data);
    // });
    // 给客户端发送 消息 - {binary:true}表示发的数据格式 是否 是以 二进制的格式
    let data = JSON.stringify({senderId:'serverId',content:'服务端-测试发送',})
    ws.send(data,{binary:true})
})
module.exports = SocketServer;