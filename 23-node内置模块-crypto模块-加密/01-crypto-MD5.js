/*
    crypto 模块的目的是为了提供通用的加密和哈希值算法，用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢，
    nodejs底层是基于C/C++实现，用C/C++实现这些算法后，通过crypto模块暴露为JavaScript接口，这样用起来方便，运行速度也快。
*/

    const crypto = require('crypto');
    // 按MD5的方式进行签名 MD5是一种常用的哈希算法，用于给任意数据一个"签名"，这个签名通常用一个十六进制的字符串表示：
    // const hash = crypto.createHash('md5'); //69a771df3d94c4b9402c7ffc1f3e1c07
    /*
        按SHA1的方式进行签名
        如果要计算SHA1，只需要把 "md5"改成'sha1'，就可以得到 SHA1 的结果 8e6edafa8a04376fef683a97ae83398e718c4bcf6dfa7608d5078181ca7d6a2f 。
    */
    const hash = crypto.createHash('sha1'); // 1a767ca2ee7544ea4e8e468d0b26c66764e7ee25
    /*
        update() 方法 可以任意多次调用 默认字符串编码为UTF-8，也可以传入Buffer
        update 将一段 普通字符串 转换成 md5  'Hello , world'+'Hello , nodejs' 被转换成 这么一段md5 (eb74a7c865c80476958195209568716a)
    */
    hash.update('Hello , world');
    hash.update('Hello , nodejs');
    // digest('hex') hex转换的格式为 十六进制 及其输出的的结果 也可以转为base64格式
    console.log(hash.digest('hex'));
    // 'base64' 转换的格式为base64格式
    // console.log(hash.digest('base64'));



