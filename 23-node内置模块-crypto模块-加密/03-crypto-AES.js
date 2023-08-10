/*
    crypto 模块的目的是为了提供通用的加密和哈希值算法，用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢，
    nodejs底层是基于C/C++实现，用C/C++实现这些算法后，通过crypto模块暴露为JavaScript接口，这样用起来方便，运行速度也快。
*/
const crypto = require('crypto');
// AES 是一种常用的对称加密算法,加解密都用同一个密钥。crypto模块提供了AES支持，但是需要自己封装函数，便于使用：
function encrypt(key, iv, data) {
    // Buffer.from(data) 将原始数据 其转为 Buffer对象， toString('binary')在转为二进制 - 防止中文解密时乱码
    data = Buffer.from(data,'utf8').toString('binary');
    // crypto模块下通过createCipheriv 创建加密的方法 算法为'aes-128-cbc'  加密的key值（） 加密的iv：密钥
    let decipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    // data 原始数据 'binary' 输入的编码格式（原始数据按照二进制的编码格式） 'hex'输出的格式（数据返回按照十六进制的编码格式）  final()方法表示已经结束了 传入'hex'结束的数据格式
    return decipher.update(data, 'binary', 'hex') + decipher.final('hex');
}
// 解密
function decrypt(key,iv,crypted){
    // Buffer.from(crypted,'hex') 加密后的数据为十六进制 将其转为 Buffer对象， toString('binary')在转为二进制
    crypted = Buffer.from(crypted,'hex').toString('binary');
    // crypto模块下通过 createDecipheriv 创建解密的方法 算法为'aes-128-cbc' 加密的key值（） 加密的iv：密钥
    let decipher = crypto.createDecipheriv('aes-128-cbc',key,iv);
    // update方法更新数据  'binary' 传入数据的格式（二进制） 'utf8'输出数据的格式 final()方法表示已经结束了 传入'utf8'结束的数据格式
    return decipher.update(crypted,'binary','utf8') + decipher.final('utf8');
}

/*
    'aes-128-cbc'加密的算法 需要保证 key和iv值都是16个字节 否则报错

    16*8=128
*/
// 加密的key值
let key = 'abcdef1234567890';
// 加密的iv：密钥
let iv = 'higkln1234567890';
// 需要加密的原始数据
let data = 'xing123-测试';
// 加密 功能
let cryted =  encrypt(key, iv, data);
console.log( '加密结果=>',cryted);
let decrypted= decrypt(key, iv, cryted);
console.log( '解密结果=>',decrypted);