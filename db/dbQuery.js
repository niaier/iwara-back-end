function dbQuery(sql) {
    return new Promise((resolve, reject) => {
        db.query(sql, '', function (err, results) {
            // if (err) return res.cc(err)

            if (err) reject(err)
            else if (results.length < 1) reject(sql,'数据为空')
            else {
                resolve(results)
            }
        })
    })

}
// async function test(sql,errInfo) { 
//     const t1 = await dbQuery(sql,errInfo)
//     console.log('promise测试',t1);
//     return t1
//  }
//  console.log(test()); 

exports.dbQuery = dbQuery