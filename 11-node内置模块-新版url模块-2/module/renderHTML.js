let text = (str) => {
    return ` <html>
        <body>
            <h4>${str}</h4>
        </body>
    </html>`
};
// 根据路径信息 返回html字符串
const renderHTML = (url) => {
    switch (url) {
        case '/login'://例：访问页面 返回html字符串
            return text('login-页')
        case '/home':
            return text('home-页')
        case '/list':
            return text('list-页')
        case '/api/home'://例：访问api接口 返回JSON字符串数据
            return `{name:'xiaoming'}`
        case '/api/list':
            return `["list1","list2","list3",]`

        default:
            return text('404 no found')
    }

}
//导出
module.exports={
    renderHTML
}