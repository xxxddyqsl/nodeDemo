/*
    如何使用node 运行js 文件
    运行方式
    在终端 打开 如D:\project\electron\node-demo 
    执行node 输入01或者文件名称 如（输入02按下Tab键 就进入02-nodeDemo 文件夹） 按下 Tab键 ，找到第一个文件夹 再次输入01 + 按下Tab键找到当前的01-hello.js文件=
    node+文件路径 显示如下：
    node .\01-认识node\01-hello.js
    回车 执行 输出如下：
    终端打印出 01-hello-nodejs 字符串

*/
console.log('nodejs - hello world');
function test (){
    console.log('test->函数执行')
};
test();
/*
    node内是不支持 window 或 document 浏览器内的全局对象
    报错：
    ReferenceError: window is not defined
    console.log(window,document)
*/