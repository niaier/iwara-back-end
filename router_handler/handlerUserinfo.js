const db = require('../db/dbIndex')
const bcrypt = require('bcryptjs')

// 创建用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
  const sql = `select id, username, nickname, email from iw_users where id=?`
  // 调用 db.query() 执行 sql 语句
  db.query(sql, req.user.id, (err, results) => {
    // 执行 sql 语句失败
    if (err) return res.cc(err)

    // 执行的 sql 语句成功，但是查询的结果可能为空
    if (results.length !== 1) return res.cc('获取用户信息失败！')

    // 用户信息获取成功
    res.send({
      status: 0,
      message: '获取用户基本信息成功！',
      data: results[0],
    })
  })
  // res.send('Ok')
}


// 更新用户信息的处理函数
exports.updateUserInfo = (req, res) => {
  // 定义待执行的sql语句
  const sql = `update iw_users set ? where id=?`
  // req.body.id根据jwt自动解析
  db.query(sql, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新用户的基本信息失败！')
    res.cc('更新用户信息成功！', 0)
  })
}
// 重置密码的处理函数
exports.updatePassword = (req, res) => {
  const sql = `select * from iw_users where id=?`
  db.query(sql, req.user.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)

    // 判断结果是否存在
    if (results.length !== 1) return res.cc('用户不存在！')

    // 判断用户输入的旧密码是否正确
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) return res.cc('旧密码错误！')

    // 定义更新密码的 SQL 语句
    const sql = `update iw_users set password=? where id=?`

    // 对新密码进行加密处理
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

    // 执行 SQL 语句，根据 id 更新用户的密码
    db.query(sql, [newPwd, req.user.id], (err, results) => {
      //语句执行失败
      if (err) return res.cc(err)

      // 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.cc('更新密码失败！')

      // 更新密码成功
      res.cc('更新密码成功！', 0)
    })
  })
  // res.send('ok')
}


  // 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
  // return res.cc('更新头像成功！', 0)
  // 更新用户头像的 sql 字段
  const sql = 'update iw_users set user_pic=? where id=?'

  db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
    // SQL 语句失败
    if (err) return res.cc(err)

    // SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('更新头像失败！')

    // 更新用户头像成功
    return res.cc('更新头像成功！', 0)
  })
}





