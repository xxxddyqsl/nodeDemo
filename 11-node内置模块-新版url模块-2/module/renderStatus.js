// 根据路径信息 返回状态码200或404
const renderStatus = (url) => {
    const arr = ['/login', '/home', '/list','/api/home','/api/list'];
    //当前url 路径 arr中是否包含
    return arr.includes(url) ? 200 : 404;
}
// 导出
exports.renderStatus=renderStatus