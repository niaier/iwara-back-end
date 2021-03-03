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


// 注册用户的处理函数
exports.regUser = (req, res) => {
    // 获取用户信息
    const userInfo = req.body

    //对表单数据合法性校验
    // console.log('username',userInfo.username,userInfo.password);
    // if (!userInfo.username || !userInfo.password) {
    //     return res.send({ status: 1, message: '用户名或密码不合法' })
    // }

    const sql = `select * from iw_users where username=?`
    db.query(sql, userInfo.username, (err, results) => {
        // 执行 sql 语句失败

        if (err) {
            // return res.send({ status: 1, message: err.message })
            return res.cc(err)
        }

        // 用户名被占用
        if (results.length > 0) {
            // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名' })
            return res.cc('用户名被占用，请更换其他用户名')
        }

        // 用户名可用，继续后续流程
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        const sql = `insert into iw_users set ?`
        db.query(sql, { username: userInfo.username, password: userInfo.password }, (err, result) => {
            // if (err) return res.send({ status: 1, message: err.message })
            if (err) return res.cc(err)
            // 判断影响行数是否为1
            if (result.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试')
            res.cc('注册成功', 0)
        })
    })
}

// 登录的处理函数
exports.login = (req, res) => {

    //接收表单数据
    const userInfo = req.body
    const sql = `select * from iw_users where username=?`

    db.query(sql, userInfo.username, (err, results) => {
        if (err) return res.cc(err)

        if (results.length != 1) return res.cc('登陆失败')
        // 判断密码是否正确
        const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)

        if (!compareResult) return res.cc('登陆失败')
        // 在服务器生成token字符串
        // 登录成功以后，给用户返回 token 值
        // 剔除 user 返回的 头像和密码 信息，
        const user = { ...results[0], password: '', user_pic: '' }
        // 进行加密，生成token
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        res.json({ status: 0, message: '登陆成功!', token: 'Bearer ' + tokenStr })
    })

    // res.send('login Ok')
}




