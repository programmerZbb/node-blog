const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf')

const con = mysql.createConnection(MYSQL_CONF)

con.connect()

const exec = (sql) => {
    let p = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })
    return p
}

module.exports = {
    exec
}