/*
    crypto 模块的目的是为了提供通用的加密和哈希值算法，用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢，
    nodejs底层是基于C/C++实现，用C/C++实现这些算法后，通过crypto模块暴露为JavaScript接口，这样用起来方便，运行速度也快。
*/
const crypto = require('crypto')
/*
    Hmac 算法也是一种哈希值，它可以利用 MD5 或 SHA1 等哈希算法，不同的是 ，Hmac 还需要一个密钥：
    只要密钥发生了变化，那么同样的输入数据也会得到不同的签名，因此，可以把 Hmac 理解为用随机数 “增强”的哈希算法。
*/
/*
    createHmac('sha256', 'secret-key') sha256 参数1：基于什么算法进行增强 你也可以用md5 如：createHmac('md5', '自己的密钥值（可自定义）')
        'secret-key' 参数2： 自己的密钥值（可自定义）

*/
// 按 sha256 方式
// const hmac = crypto.createHmac('sha256', 'secret-key');
// 按 md5 方式
const hmac = crypto.createHmac('md5', 'xingx');
/*
       update() 方法 可以任意多次调用 默认字符串编码为UTF-8，也可以传入Buffer
       update 将一段 普通字符串 转换成 Hmac  'Hello , world'+'Hello , nodejs' 被转换成 这么一段被“增强”的md5 (364b030392d18e33c0ba163ea3063ad7)
*/
hmac.update('Hello , world');
hmac.update('Hello , nodejs');
// digest('hex') hex转换的格式为 十六进制 及其输出的的结果 也可以转为base64格式
console.log(hmac.digest('hex'));
// 'base64' 转换的格式为base64格式
// console.log(hmac.digest('base64'));

