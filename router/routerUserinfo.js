const express = require('express')
const { route } = require('./routerUser')
// 创建路由对象
const router = express.Router()
// 导入用户信息的处理函数模块
const userinfo_handler = require('../router_handler/handlerUserinfo')

// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { update_userinfo_schema,update_password_schema,update_avatar_schema} = require('../schema/schemaUser')

// 获取用户的基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)

// 更新用户信息的路由
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)


//重置密码的路由
router.post('/updatepwd',expressJoi(update_password_schema),userinfo_handler.updatePassword)

// 更换头像的路由
router.post('/update/avatar',expressJoi(update_avatar_schema),userinfo_handler.updateAvatar)

// 向外共享路由对象
module.exports = router