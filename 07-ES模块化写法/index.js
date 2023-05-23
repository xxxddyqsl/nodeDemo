/*
    ES模块化写法
        node 默认规范为 commonjs规范 如导入文件方式：require('./module/moduleA')

        想要在node中使用ES模块化写法 module 规范
        如导入文件方式：import moduleA from './module/moduleA.js' 在node中导入的moduleA.js文件后缀名需要写完整，
        否则会引发报错 如：import moduleA from './module/moduleA' 如报错（Did you mean to import ../module/moduleA.js?）


        需要ES模块化写法 module 规范 前置条件 如下：
        1、首先 yarn init  生成package.json
        2、在 package.json 中 添加  "type":"module" 。默认的type:'commonjs'
*/

/*
    测试  module 规范 导入是否可行
   终端打开的文件夹： D:\project\electron\node-demo\07-ES模块化写法> 
   执行 node 命令
   输入 node  index 按下 TAb键 显示出来 要执行的文件路径 回车
*/
import moduleA from './module/moduleA.js'
import {moduleB,moduleB2} from './module/moduleB.js'
console.log(moduleA.getName())
moduleB.setName('😅');
console.log(moduleB2.getName())