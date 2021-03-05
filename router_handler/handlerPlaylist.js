/**
 * 定义和用户相关的路由处理函数，功 /router/user.js 模块尽心调用
 */
const db = require('../db/dbIndex')
// 导入加密包
const bcrypt = require('bcryptjs')
// 导入token加密包
const jwt = require('jsonwebtoken')
//导入全局配置文件
const config = require('../config')


// 获取播放列表信息
exports.getPlaylistData = function (req, res) {
    const dirname = req.params.dirname
    const sql =
        `
    SELECT  *
    FROM iw_playlist
    `
    db.query(sql, '', function (err, results) {
        if (err) return res.cc(err)
        if (results.length < 1) return res.cc('没有获取到playlist数据')

        // const list = []
        // results.forEach(function (value, key) {
        //     console.log(value.p_id_playListId, key);
        //     list.push(value.p_id_playListId)
        // })
        res.json({
            status: 0,
            message: '获取playlist数据成功!',
            playlist:results
        })
    })
}

// 获取所有播放列表界面数据

exports.getAllPlaylistData = function (req, res) {
    const sort = req.query.sort || 'upload_time'
    const desc = req.query.desc || 'desc'
    const curPage = req.query.page || 1

    const sql =
    `
    SELECT  count(*)
    FROM iw_my_playlist,iw_video_info
    WHERE iw_my_playlist.v_id_dirname = iw_video_info.dirname   
    `
    db.query(sql, '',function (err, results){
        if (err) return res.cc(err)
        if (results.length < 1) return res.cc(`没有获取到playlist数据${sql}`)
        const total = results[0]['count(*)']

        const sql = `
        SELECT  *
        FROM iw_my_playlist,iw_video_info
        WHERE iw_my_playlist.v_id_dirname = iw_video_info.dirname
        ORDER BY ${sort} ${desc} 
        LIMIT ${(curPage-1) * 40}, ${40}
        `
        
        db.query(sql, '', function (err, results){
            if (err) return res.cc(err)
            if (results.length < 1) return res.cc(`没有获取到playlist数据${sql}`)
    
            res.json({
                status: 0,
                message: '获取playlist数据成功!',
                total,
                results
            })
    
    
        })
    })




}

// 获取指定播放列表界面数据
exports.getPointPlaylistData = function (req, res) {
    const sort = req.query.sort || 'upload_time'
    const desc = req.query.desc || 'desc'
    const curPage = req.query.page || 1
    // 默认指定播放列表非空
    const playListId = req.params.id ? `=${req.params.id
        }` : 'is not null'
    const loveLevel = req.query.loveLevel ? `=${req.query.loveLevel}` : '>0'


    // 获取playlist列表
    const sql = 
    `
    SELECT  *
    FROM iw_playlist
    `

    db.query(sql, '', (err, results) => {
        if (err) return res.cc(err)
        if (results.length < 1) return res.cc(`没有获取到playlist数据${sql}`)

        // 计算总数据数目
        const sql = `
        SELECT  COUNT(*)
        FROM iw_my_playlist,iw_video_info
        WHERE iw_my_playlist.p_id_playListId ${playListId}
        AND iw_my_playlist.v_id_dirname = iw_video_info.dirname 
        `
        // console.log(sql);

        db.query(sql, '', function (err, results) {
            if (err) return res.cc(err)
            if (results.length < 1) return res.cc(`没有获取到playlist总数${sql}`)

            const total = results[0]['COUNT(*)']

            // 查询自己某一个播放列表数据
            const sql =
                `
                SELECT  *
                FROM iw_my_playlist,iw_video_info
                WHERE iw_my_playlist.p_id_playListId ${playListId}
                AND iw_my_playlist.v_id_dirname = iw_video_info.dirname 
                ORDER BY ${sort} ${desc}
                LIMIT ${(curPage-1) * 40}, ${40}
                `
                // console.log(sql);
            db.query(sql, '', function (err, results) {
                if (err) return res.cc(err)
                if (results.length < 1) return res.cc(`没有获取到myplaylist数据${sql}`)
                res.json({
                    status: 0,
                    message: '获取指定playlist数据成功!',
                    total,
                    playlistData: results
                })
            })
        })
    })
}
