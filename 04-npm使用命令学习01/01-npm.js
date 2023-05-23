/*
    npm 命令使用

    package.json // 需要安装的依赖模块
    package-lock.json //锁定依赖模块的版本号
    省略写法 npm i 或( npm install ) 安装  package.json 中使用的依赖模块
    npm i 或( npm install )  包名  指定安装 某个依赖模块
    npm i 包名 --save 局部安装
    通常情况是使用 --save 本地局部安装， -g 为全局安装 注：全局安装 在package.json 文件是没有信息记录的 其他人使用时 就无法知道需要安装什么依赖

        初始化命令
        npm init
        创建一个 package.json 文件

        安装包命令
        省略写法 npm i 或( npm install )  包名 例如 ：
        npm i md5
        // md5用于信息加密

        npm i 包名 -g (-g 为全局安装 注：全局安装 在package.json 文件是没有信息记录的 )

        npm i 包名 --save-dev ( --save 为本地局部安装 加上-dev 标记为开发环境用的（如一些开发时用的服务器） 否则为上线用的)
        加 -dev 依赖所在的位置 为 devDependencies  是开发环境 依赖 （ 如一些开发时用的服务器 ）
        不加 -dev 依赖所在的位置 为 dependencies 是生产环境 项目上线的依赖

        npm uninstall 包名 (如 ： npm uninstall md5 卸载 md5依赖 )

        npm update 包名 (如 ： npm update md5 更新 md5依赖 )
        npm update <name> -g 更新全局包
        npm update <name> --save 更新生产环境依赖包 ，将更新信息记录到 package.json 文件中
        npm update <name> --save-dev 更新开发环境依赖包，将更新信息记录到 package.json 文件中

        npm list -g (不加 -g 列举当前目录下的安装包)

        npm info 包名 (详细信息)

        npm info 包名 version (获取最新版本)

        npm i md5@1 (@1 安装指定的版本)

        npm outdated (检查所有的包是否已经过时)

        npm 手动设置 淘宝镜像
        npm config set registry https://registry.npm.taobao.org

        查看 npm 地址  获取当前npm 连接的地址
        npm config get registry


        package.json文件中：
        如：
        "dependencies":{
            // ^2.1.0"  如果 直接 npm install 将会安装 md5的 2.版本的最新版本
            ^ 表示锁定 前一位大版本号 2 并且安装 2 版本中最新版本 如 2.3.0
            "md5":"^2.1.0",

            // 没有 ^ 表示 要安装的就是 2.1.0版本的md5
            "md5":"2.1.0",

            // ~2.1.0 如果 直接 npm install 将会安装 md5的 2.1 版本的最新版本
            ~表示锁定 前两位大版本号 2.1  并且安装 2.1 版本中最新版本
            "md5":"~2.1.0",

            // *2.1.0 如果 直接 npm install 将会安装 md5的 最新的版本
            * 表示安装最新的版本
            "md5":"*",
        }

        // 扩展 中国npm镜像 如下：
        这是一个完整 npmjs.org 镜像，你可以用此方案代替官方版本（只读），同步频率目前为10分钟一次以保证尽量与官方服务同步
        // 安装cnpm 工具
        npm install -g cnpm --registry=https://registry.npmmirror.com

        注：尽量使用npm 或 yarn的官方源 cnpm 或 淘宝镜像 下载的依赖可能会存在丢包的问题
*/