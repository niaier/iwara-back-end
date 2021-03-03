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


// 获取video页面数据处理函数
exports.getVideoData = function (req, res) {
    const sort = req.query.sort || 'upload_time'
    const desc = req.query.desc || 'desc'
    const curPage = req.query.page || 1


    const sql = `SELECT count(*) FROM iw_video_info WHERE isDown=1`

    db.query(sql, '', (err, results) => {
        if (err) return res.cc(err)
        if (results.length < 1) return res.cc('没有获取到video数据')
        // 视频总数量
        const total = results[0]['count(*)']
        // 获取当前页的视频列表数据
        const sql =
            `
            SELECT 
              * 
            FROM
              iw_video_info 
            WHERE isDown = 1 
            ORDER BY ${sort} ${desc} 
            LIMIT ${(curPage-1) * 40}, ${40}
            `

        db.query(sql, '', (err, results) => {
            if (err) return res.cc(err)
            if (results.length < 1) return res.cc('没有获取到当前页数据')

            res.send({
                status: 0,
                message: '获取video数据成功!',
                total,
                video: results
            })
        })
    })

}

