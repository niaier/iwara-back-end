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




// 获取love页面数据处理函数
exports.getLoveData = function (req, res) {
    const sort = req.query.sort || 'upload_time'
    const desc = req.query.desc || 'desc'
    const curPage = req.query.page || 1
    const loveLevel = req.query.loveLevel ? `=${req.query.loveLevel}` : '>0'
    // 获取love总数目
    const sql = `
        SELECT  COUNT(*)
        FROM iw_video_info,love_list
        WHERE love_list.v_id=iw_video_info.dirname
        AND love_list.love_level ${loveLevel}
        `

    db.query(sql, '', function (err, results) {
        if (err) return res.cc(err)
        if (results.length < 1) return res.cc('没有获取到love数据')
        const total = results[0]['COUNT(*)']

        // 获取love列表
        const sql =
            `
            SELECT  *
            FROM iw_video_info,love_list
            WHERE love_list.v_id=iw_video_info.dirname
            AND love_list.love_level ${loveLevel}
            ORDER BY ${sort} ${desc}  
            LIMIT ${(curPage - 1) * 40},${40}
            `
        db.query(sql, '', (err, results) => {
            if (err) return res.cc(err)
            if (results.length < 1) return res.cc('没有获取到love数据')
            // 视频总数量

            res.json({
                status: 0,
                message: '获取love数据成功!',
                total,
                loveData: results
            })
        })
    })


}