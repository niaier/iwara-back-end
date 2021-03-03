const express = require('express')
// 创建路由对象
const router = express.Router()


// 导入用户路由处理函数模块
const userHandle = require('../router_handler/handlerUser')


// 1.导入验证数据中间件
const expressJoi = require('@escook/express-joi')
// 2.验证规则对象
const { reg_login_schema} =require('../schema/schemaUser')

// 注册新用户
router.post('/reguser', expressJoi(reg_login_schema),userHandle.regUser)
// 登录功能
router.post('/login', userHandle.login)

// 将路由对象共享出去
module.exports = router