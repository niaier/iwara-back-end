const express = require('express')
// 创建路由对象
const router = express.Router()

const video_handler = require('../router_handler/handlerVideo')

router.get('/video', video_handler.getVideoData)


// 向外共享路由对象
module.exports = router