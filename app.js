// 导入 express 模块
const express = require('express')

// 创建 express 的服务器实例
const app = express()


const joi =require('@hapi/joi')

// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())


// 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// 在路由之前封装res.cc函数
app.use((req, res, next) => {
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

// 路由之前配置中间件
const expressJWT = require('express-jwt')
// 导入配置
const config = require('./config')

// token验证
app.use(expressJWT({secret: config.jwtSecretKey}).unless({path: [/^\/api/,/^\/info/]}))

// 导入并注册用户路由模块
const userRouter = require('./router/routerUser.js')
app.use('/api', userRouter)

// 导入并注册用户信息路由模块
const userinfoRouter = require('./router/routerUserinfo')
app.use('/my',userinfoRouter)

// 导入并注册video数据获取模块
const videoRouter = require('./router/routerVideo')
app.use('/api',videoRouter)

// 导入并注册love数据获取模块
const loveRouter = require('./router/routerLove')
app.use('/api',loveRouter)

// 导入并注册playlist数据获取模块
const playlistRouter = require('./router/routerPlaylist')
app.use('/api',playlistRouter)


// 导入并注册play数据获取模块
const playRouter = require('./router/routerPlay')
app.use('/api',playRouter)


// 错误中间件
app.use((err, req, res, next) => {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  if (err.name === 'UnauthorizedError') return res.cc('UnauthorizedError,身份认证失败,需要token')
  // 未知错误
  res.cc(err)
})

// 指定端口并启动 web 服务器
app.listen(8000, () => {
  console.log('api server running at http://127.0.0.1:8000')
})