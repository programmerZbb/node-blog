const env = process.env.NODE_ENV
let MYSQL_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'qazplm',
        port: '3306',
        database: 'myblog' //连接的库，相当于 use myblog
    }
}

if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'qazplm',
        port: '3306',
        database: 'myblog' //连接的库，相当于 use myblog
    }
}

module.exports = {
    MYSQL_CONF
}