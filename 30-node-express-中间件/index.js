// 自定义 封装 应用级中间件
// const applicationLevelModule = require('./01-中间件-应用级中间件');
// applicationLevelModule.init();

// 自定义 封装 路由级中间件 - 写法1：
// const routerModule01 = require('./02-中间件-路由级中间件-01');
// routerModule01();

// 自定义 封装 路由级中间件 - 写法2：
// const routerModule02 = require('./02-中间件-路由级中间件-02');
// routerModule02();


// 自定义 封装 错误中间件 
const errorModule = require('./03-中间件-错误中间件');
errorModule();