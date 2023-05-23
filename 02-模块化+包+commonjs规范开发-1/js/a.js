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