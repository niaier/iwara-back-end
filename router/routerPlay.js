const express = require('express')
// 创建路由对象
const router = express.Router()

const playlist_handler = require('../router_handler/handlerPlay')

// 获取播放页面数据
router.get('/play/:dirname', playlist_handler.getPlayData)

router.get('/play/:dirname/list', playlist_handler.getListData)

router.get('/play/:dirname/love', playlist_handler.getLoveData)

//播放页面操作喜爱love
router.put('/play/:dirname/love/:level', playlist_handler.addLove)

//播放页面添加列表
router.put('/play/list/:listname', playlist_handler.addList)
// 添加到或删除我的播放列表
router.put('/play/:dirname/list/:id/:ismylist', playlist_handler.addMyPlaylist)
//播放页面删除列表包括我的播放列表中的功能
router.delete('/play/:dirname/list/:id', playlist_handler.deleteList)



// 向外共享路由对象
module.exports = router