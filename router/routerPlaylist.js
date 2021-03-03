const express = require('express')
// 创建路由对象
const router = express.Router()

const playlist_handler = require('../router_handler/handlerPlaylist')

router.get('/playlist', playlist_handler.getPlaylistData)

// 向外共享路由对象
module.exports = router