const express = require('express')
const { route } = require('./routerUser')
// 创建路由对象
const router = express.Router()

const love_handler = require('../router_handler/handlerLove')

router.get('/love', love_handler.getLoveData)


// 向外共享路由对象
module.exports = router