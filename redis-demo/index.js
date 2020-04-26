// redis 使用 demo
const redis = require('redis')

// 创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', err => {
    console.log(err)
})

// 测试例子
redisClient.set('username2', 'test', redis.print)
redisClient.get('username3', (err, val) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(val)
    // 退出
    redisClient.quit()
})