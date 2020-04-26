const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.log(err)
})

const getRedis = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                return reject(err)
            }
            if (val === null) {
                return resolve(null)
            } 
            try {
                resolve(
                    JSON.parse(val)
                )
            } catch (err) {
                resolve(val)
            }
        })
    })
}

const setRedis = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    redisClient.set(key, value, redis.print)
}

module.exports = {
    getRedis,
    setRedis
}