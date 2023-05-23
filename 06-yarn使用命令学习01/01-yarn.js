/*
    yarn 的使用 (推荐使用 yarn 命令)
    对比npm：
        1- 速度超快：yarn 缓存了每个下载过的包，所以再次下载时无需重复下载. 同时利用并行下载以最大化资源利用率，
                    因此安装速度更快。
        2- 超级安全：在执行代码之前，yarn会通过算法校验每个安装包的完整性

    全局安装 yarn 命令如下：
    npm i yarn -g

    yarn 所有命令

    初始化项目
    yarn init //创建一个package.json文件

    安装项目的全部依赖
    yarn install （可省略 使用 yarn i）//安装package.json文件中全部的依赖模块

    添加安装某个依赖
     yarn add 默认局部安装在 dependencies中  dependencies 为是生产环境 项目上线的依赖
    yarn add 包名 --save（局部安装）
    yarn add 包名@1 --save（安装指定版本 如 yarn add md5@1 --save）
    yarn add 包名 --dev （--dev devdependencies 开发环境使用的依赖）

    升级安装某个依赖
    yarn upgrade 包名@1 （升级到指定版本）

    全局安装
    yarn global add 包名

    全局卸载指定安装包
    yarn global remove 包名

*/