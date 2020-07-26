const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
// 全局的session数据，全局的能用大写
// const SESSION_DATA = {}
let needSetSession = false
let userId
const { getRedis, setRedis } = require('./src/db/redis')

const getCookieExpires = () => {
    const date = new Date()
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000))
    return date.toUTCString()
}

const getPostData = (req, res) => {
    return new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            return resolve({})
        }
        if (req.headers['content-type'] !== 'application/json') {
            return resolve({})
        }
        // 处理postdata 数据
        let postData = ''
        req.on('data', (chunk) => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                return resolve({})
            }
            resolve(JSON.parse(postData))
        })
    })
}

const handleRouter = (req, res) => {
    // blog 接口处理
    const blogData = handleBlogRouter(req, res)
    if (blogData) {
        blogData.then(data => {
            if (needSetSession) {
                res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
            }
            res.end(JSON.stringify(data))
        })
        return
    }
    // 处理user请求
    const userData = handleUserRouter(req, res)
    if (userData) {
        userData.then(data => {
            if (needSetSession) {
                res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
            }
            res.end(JSON.stringify(data))
        })
        return
    }
    // 处理 404
    res.writeHeader(404, {'Content-type': 'text/plain'})
    res.write('404 Not Found\n')
    res.end()
}

module.exports = (req, res) => {
    // 返回的格式 JSON
    res.setHeader('Content-Type', 'application/json')
    let url = req.url
    req.path = url.split('?')[0]
    // 处理querystring
    let query = url.split('?')[1]
    req.query = querystring.parse(query)

    // 处理cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const value = arr[1].trim()
        req.cookie[key] = value
    })
    
    // 处理 session
    userId = req.cookie.userid
    // if (userId) {
    //     if (!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {}
    //     }
    // } else {
    //     needSetSession = true
    //     userId = Date.now() + '_' + Math.random()
    //     setRedis(userId, {})
    // }
    if (!userId) {
        needSetSession = true
        userId = Date.now() + '_' + Math.random()
        setRedis(userId, {})
    }
    // 为req创建一个sessionId属性，
    req.sessionId = userId;
    getRedis(req.sessionId)
        .then(sessionData => {
            if (sessionData === null) {
                setRedis(req.sessionId, {})
                req.session = {}
            } else {
                req.session = sessionData
            }

            // 处理post请求
            return getPostData(req, res)
                
        })
        .then(postData => {
            req.body = postData
            handleRouter(req, res)
        })


}