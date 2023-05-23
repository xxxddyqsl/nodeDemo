/*
nrm 的使用
    介绍：nrm 是npm的镜像源管理工具，有时候国外资源太慢， 使用这个就可以快速的在npm源间切换.
    也可以手动切换 如下：

    npm 手动设置 淘宝镜像
    npm config set registry https://registry.npm.taobao.org

    查看 npm 地址  获取当前npm 连接的地址
    npm config get registry 获取当前npm 连接的地址

    全局安装 nrm 命令
    命令 npm i nrm -g

    使用nrm
    命令 nrm ls 查看可选择的源，其中带*的是当前使用的源，上面的输出表明当前源是官方源。

    切换 nrm
    如果要切换到taobao源，执行命令 nrm use taobao

    测试速度
    你可以通过 nrm test 测试相应源的响应时间
    命令 nrm test


    // 扩展 中国npm镜像 如下：
    这是一个完整 npmjs.org 镜像，你可以用此方案代替官方版本（只读），同步频率目前为10分钟一次以保证尽量与官方服务同步
    // 安装cnpm 工具
    npm install -g cnpm --registry=https://registry.npmmirror.com

    注：尽量使用npm 或 yarn的官方源 cnpm 或 淘宝镜像 下载的依赖可能会在存在问题

*/