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

// 获取播放界面视频基本信息数据
exports.getPlayData = function (req, res) {
    const dirname = req.params.dirname
    const sql =
        `
    SELECT  *
    FROM iw_video_info
    WHERE iw_video_info.dirname=${dirname}
    `
    db.query(sql, '', function (err, results) {
        if (err) return res.cc(err)
        if (results.length < 1) return res.cc('没有获取到video数据')
        res.json({
            status: 0,
            message: '获取play数据成功!',
            video: results[0]
        })
    })
}

// 获取播放界面视频相关列表基本信息数据 列表id
exports.getListData = function (req, res) {
    const dirname = req.params.dirname
    const sql =
        `
    SELECT  *
    FROM iw_my_playlist
    WHERE iw_my_playlist.v_id_dirname=${dirname}
    `
    db.query(sql, '', function (err, results) {
        if (err) return res.cc(err)
        if (results.length < 1) return res.cc('没有获取到video数据')

        const list = []
        results.forEach(function (value, key) {
            // console.log(value.p_id_playlist_id, key);
            list.push(value.p_id_playlist_id)
        })
        res.json({
            status: 0,
            message: '获取play数据成功!',
            list
        })
    })
}

// 获取播放界面视频相关喜爱基本信息数据
exports.getLoveData = function (req, res) {
    const dirname = req.params.dirname
    const sql =
        `
    SELECT  *
    FROM iw_love_list
    WHERE iw_love_list.v_id=${dirname}
    `
    db.query(sql, '', function (err, results) {
        if (err) return res.cc(err)
        if (results.length < 1) return res.cc('没有获取到love数据')

        res.json({
            status: 0,
            message: '获取Love数据成功!',
            loveLevel:results[0].love_level
        })
    })
}

//添加播放界面视频相关喜爱
exports.addLove = function (req, res) {
    const dirname = req.params.dirname
    const loveLevel = req.params.level

    // 首先判断是否存在
    const sql =
        `
    SELECT  *
    FROM iw_love_list
    WHERE v_id=${dirname} 
    `
    db.query(sql, '', function (err, results) {
        if (err) return res.cc(err)
        if (results.length < 1) return res.cc('查询是否有love失败')

        const sql =
            `
        UPDATE iw_love_list
        SET love_level=${loveLevel}
        WHERE v_id=${dirname}
        `
        // console.log(sql);
        db.query(sql, '', function (err, results) {
            res.json({
                status: 0,
                message: '添加love数据成功!',
                results
            })
        })
    })
}


// 添加播放列表接口
exports.addList = function (req, res) {
    // '/play/:dirname/list/:NAME'
    const dirname = req.params.dirname
    const listName = req.params.listname

    const sql =
        `
        INSERT INTO 
        iw_playlist 
        (play_list_name) 
        VALUES('${listName}')
        `
    db.query(sql, '', function (err, results) {
        if (err) return res.cc(err)
        if (results.length < 1) return res.cc('添加playlist失败')

        res.json({
            status: 0,
            message: '添加playlist数据成功!',
            list: results
        })
    })
}


//添加到我的播放列表
exports.addMyPlaylist = function (req, res) {
    const dirname = req.params.dirname
    // 判断是否添加到我的播放列表
    const isMyPlaylist = JSON.parse(req.params.ismylist)
    const playlistId = req.params.id
    // 根据dirname和列表id查询是否已存在
    const sql =
        `
        SELECT  *
        FROM iw_my_playlist
        WHERE v_id_dirname=${dirname} 
        AND p_id_playlist_id=${playlistId}
        `
    // console.log(sql);
    db.query(sql, '', function (err, results) {
        if (err) return res.cc(err)
        // if (results.length < 1) return res.cc('判断是否已经添加到我的列表失败')
        // 更新dirname和列表id
        let sql = ''
        // console.log(results.length,isMyPlaylist );
        if (results.length == 0 && isMyPlaylist == true) {
            sql =
                `
                INSERT INTO
                iw_my_playlist 
                (v_id_dirname,p_id_playlist_id) 
                value('${dirname}','${playlistId}')
                `
        } else if (results.length && isMyPlaylist == false) {
            sql =
                `
                DELETE
                FROM iw_my_playlist
                WHERE v_id_dirname=${dirname} 
                AND p_id_playlist_id=${playlistId} 
                `
        }
        if (!sql) return res.cc('sql语句为空')
        db.query(sql, '', function (err, results) {
            let options = ''
            isMyPlaylist ? option = '添加' : option = '删除'
            if (err) return res.cc(err)
            if (results.length < 1) return res.cc(`${option}到我的列表失败`)

            res.json({
                status: 0,
                message: `${option}到我的列表成功`,
                result: results
            })

        })


    })
}


// 删除播放列表接口
exports.deleteList = function (req, res) {
    // '/play/:dirname/list/:id'
    const dirname = req.params.dirname
    const listID = req.params.id

    const sql =
        `
        DELETE
        FROM iw_playlist
        WHERE play_list_id=${listID}
        `
    db.query(sql, '', function (err, results) {
        if (err) return res.cc(err)
        if (results.length < 1) return res.cc('删除playlist列表失败')

        const sql =
            `
        DELETE
        FROM iw_my_playlist
        WHERE p_id_playlist_id= ${listID}
        `
        db.query(sql, '', function (err, results) {
            if (err) return res.cc(err)
            if (results.length < 1) return res.cc('删除myplaylist列表失败')
            res.json({
                status: 0,
                message: '删除列表数据和myplaylist成功!',
                results
            })

        })

    })
}
