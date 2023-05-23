/* commonjs规范：
    我们可以把公共的功能 抽离成为一个单独的js 文件 作为一个模块，默认情况下面这个模块里面的方法或属性
    外面是无法访问的，如果要让外部可以访问模块里面的方法或属性，就必须在模块里面通过 exports 或者 module.exports 暴露方法或属性。
    需要访问的模块 require('./a.js') 导入引用
*/

/*
    导入 a.js 此时获取到 a.js 内部暴露出来的 test方法 变量接收
    moduleA = test();
    moduleA() 执行暴露出的 test 方法

    在终端 运行node+文件路径 命令 通过
    node .\03-模块化+包+commonjs规范开发-2\js\main.js
    输出如下：
    _init-aaa
    test-aaa
*/

var moduleA = require('./a');
// 终端中 首先打印 Xiaoming-b.js中使用 虽然首先导入a.js main.js中当前还没有使用执行a.js中的upper方法 但是 b.js 使用了upper方法
var moduleB = require('./b');
var moduleC = require('./c');
moduleA.test();
// console.log(moduleA.upper('hello world'));
moduleB();
moduleC.obj.test();
// console.log(moduleB)
