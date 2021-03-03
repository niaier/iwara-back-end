const express = require('express')
// 创建路由对象
const router = express.Router()

const playlist_handler = require('../router_handler/handlerPlaylist')

// 获取所有列表
// router.get('/playlist', playlist_handler.getPlaylistData)

// 获取列表
router.get('/playlist', playlist_handler.getPlaylistData)

//获取所有列表数据
router.get('/playlist/all', playlist_handler.getAllPlaylistData)

//获取指定列表数据
router.get('/playlist/:id', playlist_handler.getPointPlaylistData)

// 向外共享路由对象
module.exports = router