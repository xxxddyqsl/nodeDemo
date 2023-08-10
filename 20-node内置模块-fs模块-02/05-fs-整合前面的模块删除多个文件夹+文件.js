
const fs = require('fs');

/*
思路：通过传入一个需要删除的文件夹路径，先使用NodeJs中的fs模块readdir()对文件夹进行读取，因为他是一个数组，
所以先判断这个文件夹是否为空数组，如果为空数组，就删除该文件夹，如果不为空，就遍历这个文件夹，先判断是否为文件，
如果是文件就删除文件，如果不是就再次执行函数，直到删除这个文件夹，我的步骤中缺点也比较明显，在遍历是会有很多代码冗余，
因为遍历之后再次执行这个函数导致会再次遍历，但其实内容已经被删除了
*/
init()
function init() {
    let path = './avatars';
    deleteFiles(path);
};
// 封装函数，使用递归
function deleteFiles(path) {
    fs.readdir(path, (err, files) => {
        console.log('readdirList==>',files)
        if (err) {
            console.log('readdir==>', err);
        } else {
            // 当前路径下 没有其他文件或文件夹直接删除
            if (files.length === 0) {
                fs.rmdir(path, (err) => {
                    if (err) {
                        console.log('rmdir==>', err);
                    } else {
                        console.log('rmdir删除文件夹==>', err)
                    }
                })
            } else {
                // 遍历文件夹下 文件或文件夹
                files.map(item => {
                    // 保存路径
                    const statPath = `${path}/${item}`
                    // 判断是否为文件
                    fs.stat(statPath, (err, data) => {
                        if (err) {
                            console.log('stat==>', err);
                        } else if (data.isFile()) {  // 是否是文件
                            // 删除文件
                            fs.unlink(statPath, err => {
                                if (err) {
                                    console.log('unlink==>', err);
                                } else {
                                    console.log('unlink 删除文件==>', err)
                                }
                            })
                        } else if (data.isDirectory()) {// 是否是目录(文件夹)
                            // 传入文件夹路径 遍历 删除文件夹下的文件
                            deleteFiles(statPath)
                        }
                    })
                })
                console.log('for=>', path,files)
                // 传入文件夹路径 删除此目录(文件夹)
                deleteFiles(path)
            }
        }
    })
}

