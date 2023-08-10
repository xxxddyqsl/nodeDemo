const fs = require('fs');
/*
    Stream流 比较适用于大文件 只占用很小的内存
    打开一个流 读取文件 'utf-8'设置写入流的格式 默认 Buffer(二进制数据)
*/

const ws = fs.createWriteStream('./test2.json',)
let data = {
    "id":"D",
    "name":"D-name"
}
// 要以流的形式写入文件，只需要不断调用 write()方法，最后以为end()结束。
ws.write(JSON.stringify(data));
data.id="E";
data.name="E-name"
ws.write(JSON.stringify(data));
ws.end()