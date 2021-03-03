const mysql =  require('mysql')

// 创建数据库对象
const db =mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'iwara_copy'
})

module.exports = db