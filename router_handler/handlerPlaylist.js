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



// 获取指定播放列表界面数据
exports.getPlaylistData = function (req, res) {
    const sort = req.query.sort || 'upload_time'
    const desc = req.query.desc || 'desc'
    const curPage = req.query.page || 1
    const playListId = req.query.playListId ? `=${req.query.playListId
        }` : 'is not null'
    const loveLevel = req.query.loveLevel ? `=${req.query.loveLevel}` : '>0'


    // 获取playlist列表
    const sql = 
    `
    SELECT  *
    FROM playlist
    `;

    db.query(sql, '', (err, results) => {
        if (err) return res.cc(err)
        if (results.length < 1) return res.cc(`没有获取到playlist数据${sql}`)

        // 计算总数据数目
        const sql = `
        SELECT  COUNT(*)
        FROM myplaylist,iw_video_info,love_list
        WHERE myplaylist.p_id_playListId ${playListId}
        AND myplaylist.v_id_dirname = iw_video_info.dirname 
        `
        console.log(sql);

        db.query(sql, '', function (err, results) {
            if (err) return res.cc(err)
            if (results.length < 1) return res.cc(`没有获取到playlist总数${sql}`)

            const total = results[0]['COUNT(*)']

            // 查询自己某一个播放列表数据
            const sql =
                `
                SELECT  *
                FROM myplaylist,iw_video_info,love_list
                WHERE myplaylist.p_id_playListId ${playListId}
                AND myplaylist.v_id_dirname = iw_video_info.dirname 
                ORDER BY ${sort} ${desc}
                LIMIT ${(curPage-1) * 40}, ${40}
                `

            db.query(sql, '', function (err, results) {
                if (err) return res.cc(err)
                if (results.length < 1) return res.cc(`没有获取到myplaylist数据${sql}`)
                res.json({
                    status: 0,
                    message: '获取playlist数据成功!',
                    total,
                    playlistData: results
                })
            })
        })
    })
}
