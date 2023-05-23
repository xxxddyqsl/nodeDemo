let name;
const moduleB={
    init(){

    },
    setName(str){
        name=str;
    },
    getName(){
        return '测试 ES模块化写法导出 moduleB';
    },
};
const moduleB2={
    getName(){
        return '测试 ES模块化写法导出 moduleB2'+name;
    },
}
const moduleB3={
    getName(){
        return '测试 ES模块化写法导出 moduleB3'+name;
    },
}
// 导出 多个
export{
    moduleB,moduleB2
}