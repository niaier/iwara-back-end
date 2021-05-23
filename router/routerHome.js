const express = require('express')
const { route } = require('./routerUser')
// 创建路由对象
const router = express.Router()

const home_handler = require('../router_handler/handlerHome')

router.get('/home', home_handler.getHomeData)


// 向外共享路由对象
module.exports = router