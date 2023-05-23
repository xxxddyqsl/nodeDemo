/* commonjs规范：
    我们可以把公共的功能 抽离成为一个单独的js 文件 作为一个模块，默认情况下面这个模块里面的方法或属性
    外面是无法访问的，如果要让外部可以访问模块里面的方法或属性，就必须在模块里面通过 exports 或者 module.exports 暴露方法或属性。
    需要访问的模块 require('./a.js') 导入引用
*/

function test(){
    /*
        内部 受保护的私有方法 不想暴露出去让其他地方可以调用 命名规则函数前加下划线 标识一下 如下_init
        但是传统中其他的js文件中 也可以 通过 _init() 直接调用
        因此就需要模块化的规范开发方式 - 只暴露出我想暴露出去的 + 引用
    */
    _init()
    console.log('test-aaa')
}
function _init(){
    console.log('_init-aaa')
}
// 首字母 大写
function upper(str){
   return str.substring(0,1).toUpperCase()+str.substring(1)
}
/*
    暴露 导出方式1： module.exports
    //暴露出去的test方法  时是未执行的状态
    module.exports = test
    //暴露出去的test方法 时是相当于执行的状态 并且每次调用 当前 a.js 文件时 默认都会执行
     module.exports = test()
*/
// 导出 单个
// module.exports = test;
// 此处 使用多个 module.exports 会 覆盖之前module.exports导出的内容
// module.exports = upper;
// 导出 多个的方式
module.exports = {
    test:test,
    upper,
};
// 导出方式2： exports 可导出多个
// exports.test=test;
// exports.upper=upper;
// 或
// exports.obj={
//     test,
//     upper
// }
