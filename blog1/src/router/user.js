const { user } = require('../controller')
const { SuccessModel, EroorModel } = require('../module/resModel')

const getCookieExpires = () => {
    const date = new Date()
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000))
    return date.toUTCString()
}

module.exports = (req, res) => {
    let method = req.method
    if (req.path === '/api/user/login' && method === 'GET') {
        const result = user.login(req.query.username || '', req.query.password || '')
        return result.then(loginRes => {
            if (loginRes[0]) {
                res.setHeader('Set-Cookie', `username=${loginRes[0].username}; path=/; httpOnly; expires=${getCookieExpires()}`)
                return new SuccessModel()
            }
            return new  EroorModel('用户验证失败')
        }, err => {
            return new EroorModel(err)
        })
    }

    // 验证登录测试
    if (req.path === '/api/user/login-test' && method === 'GET') {
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel({
                username: req.cookie.username
            }))
        }
        return Promise.resolve(new EroorModel('登录失败'))
    }
}