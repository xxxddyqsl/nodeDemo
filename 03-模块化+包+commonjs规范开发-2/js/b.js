/* commonjs规范：
    我们可以把公共的功能 抽离成为一个单独的js 文件 作为一个模块，默认情况下面这个模块里面的方法或属性
    外面是无法访问的，如果要让外部可以访问模块里面的方法或属性，就必须在模块里面通过 exports 或者 module.exports 暴露方法或属性。
    需要访问的模块 require('./a.js') 导入引用
*/
// 使用 a.js 中的 首字母大写 方法
const moduleA = require('./a');
console.log(moduleA.upper('xiaoming-b.js中使用'));
function test(){
    console.log('test-bbb')
}
/* 
    //暴露出去的test方法  时是未执行的状态
    module.exports = test
    //暴露出去的test方法 时是相当于执行的状态
     module.exports = test()
*/
// 暴露 导出方式1： module.exports
module.exports = test
// 导出方式2： exports  可多个
// exports.test=test;
// exports.test1=test;