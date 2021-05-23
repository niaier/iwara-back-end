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
exports.getHomeData = function (req, res) {
  // 获取最近热门视频
  const sql = `
  SELECT  *
  FROM iw_video_info
  WHERE love>800
  ORDER BY id DESC 
  LIMIT 0,10
  `
  db.query(sql, '', function (err, results) {
    if (err) return res.cc(err)
    if (results.length < 1) return res.cc(`没有获取到HOME页面最近热门数据${sql}`)
    // console.log(results);
    const hotData = results
    // 最近更新
    const sql = `
    SELECT  *
    FROM iw_video_info
    ORDER BY id DESC 
    LIMIT 0,10
    `
    db.query(sql, '', function (err, results) {
      if (err) return res.cc(err)
      if (results.length < 1) return res.cc(`没有获取到HOME页面最近更新数据${sql}`)

      const updateData = results
      // 我的关注
      const sql = `
      SELECT  *
      FROM iw_video_info
      ORDER BY id DESC 
      LIMIT 0,10
        `
      db.query(sql, '', function (err, results) {
        if (err) return res.cc(err)
        if (results.length < 1) return res.cc(`没有获取到HOME页面我的关注数据${sql}`)
        const myFocusData = results
        res.json({
          status: 0,
          message: '获取HOME页面最近热门数据成功!',
          hotData,
          updateData,
          myFocusData
        })
      })
    })

  })
  // console.log('此处是home页面');
  // res.send('此处是home页面');
}