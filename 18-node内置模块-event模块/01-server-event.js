/*  event模块

    对于异步操作除了之前传入匿名（ callback ）回调函数解决，
    还可以通过event订阅发布模式来实现函数与函数之间的解耦
*/
const EventEmitter = require('events');
class MyEventEmitter extends EventEmitter {

};
const event = new MyEventEmitter();
// 通过 on 监听事件 play 监听的关键字  类似发布事件
event.on('play',(movie)=>{
    console.log('on监听事件-play==>',movie)
});
event.on('run',(movie)=>{
    console.log('on监听事件-run==>',movie)
});
// 通过 emit 触发on 事件 play 监听的关键字 类似订阅事件
event.emit('play',['hello world']);
// 模拟异步 - 定时器
setTimeout(()=>{
    event.emit('play','模拟异步 - 定时器');
},2000)
event.emit('run',['hello world2']);
// console.log(event)

