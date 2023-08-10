const fs = require('fs');
/*
    Stream流 比较适用于大文件 只占用很小的内存
    打开一个流 读取文件 'utf-8'设置读取流返回的格式 默认 Buffer(二进制数据)
*/
const rs=fs.createReadStream('./test.json','utf-8');
let data =``;
// 注意 data 事件可能多次，每次传递的 chunk是流的一部分数据，要以流的形式写入文件，只需要不断调用 write()方法，最后以为end()结束。
rs.on('data',(chunk)=>{
    // 收集 传递的 chunk每一部分流数据
    data+=chunk
    console.log('data=>',chunk)
})
//  流全部传递完成 触发 end 事件
rs.on('end',()=>{
    console.log('end=>',data)
})
rs.on('error',(error)=>{
    console.log('error=>',error)
})
