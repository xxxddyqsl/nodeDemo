const util = {
    // 根据 websocket 返回的数据类型 对数据进行 预处理 生成 Uint8Array 最后pb模块解析
   async SocketType(data, websocket) {
        switch (websocket.binaryType) {
            case "blob":
              let msg = await this.blobType(data);
              console.log(msg)
              return msg
            case "arraybuffer":
                this.bufferType(data);
                break;
            default:
                console.log('error:未解析Socket');
        }
    },
    stringToBlob(string){ //将字符串 转换成 Blob 对象
        let blob = new Blob([string], {
            type: 'text/plain'
        });
        return blob;
    },
     //将 ArrayBufferView  转换成Blob - 转为//中文字符串
    ArrayBufToString(buf,reader){
        return new Promise((resolve,reject)=>{
            reader.readAsText(new Blob([buf]), 'utf-8');
            reader.onload = function () {
                resolve(reader.result) //返回-中文字符串
            }
        })
    },
    //websocket  返回的数据类型 blob 预处理
    blobType(data) {
        return new Promise((resolve,reject)=>{
            var reader = new FileReader();
            //将Blob 对象转换成 ArrayBuffer
            reader.readAsArrayBuffer(data);
            reader.onload = function (e) {
                //  reader.result- ArrayBuffer 格式
                let buf = new Uint8Array(reader.result);
                console.info(buf)
                // 解析 返回的数据
                resolve({buf,reader});
            }
        })
    },
    // websocket  返回的数据类型 ArrayBuffer 预处理
    bufferType(data) {
        let buf = new Uint8Array(data, 0, data.byteLength);
        // 解析 返回的数据
        return buf;
    },
}