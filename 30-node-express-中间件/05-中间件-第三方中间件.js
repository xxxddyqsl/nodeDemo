/*
    第三方中间件-介绍：

    安装所需功能的node模块，并在应用中加载，可以在应用级（如：app.use()）加载,
    也可以在路由级（如：const router = express.Router();router.get('/login',cookieParser()) ）加载。

    下面的例子安装并加载一个解析 cookie 的中间件：cookie-parser
    1.先安装
        命令 ： yarn add cookie-parser
    2.导入 ：const cookieParser = require('cookie-parser')
    3.加载 ：app.use(cookieParser()) 加载用于解析来 使用 cookie 中间件


    待补充，未学习完
*/
const express = require('express');
const app = express();
// 导入
const cookieParser = require('cookie-parser');
// 使用 ： 加载用于解析 cookie 中间件
app.use(cookieParser())