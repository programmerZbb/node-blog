const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qazplm',
    post: '3306',
    database: 'myblog'
})

con.connect()

let sql = `insert into blog (title, content, createtime, author) values ('测试2', '内容2', '1587224924957', '李四');`
// let sql = `select * from blog`
con.query(sql, (err, result) => {
    if (err) {
        return console.log(err)
    }
    console.log(result)
})
con.end()