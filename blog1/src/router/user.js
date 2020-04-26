const { user } = require('../controller')
const { SuccessModel, EroorModel } = require('../module/resModel')

module.exports = (req, res) => {
    let method = req.method
    if (req.path === '/api/user/login' && method === 'GET') {
        const result = user.login(req.query.username || '', req.query.password || '')
        return result.then(loginRes => {
            if (loginRes[0]) {
                req.session.username = loginRes[0].username
                req.session.realname = loginRes[0].realname
                return new SuccessModel()
            }
            return new  EroorModel('用户验证失败')
        }, err => {
            return new EroorModel(err)
        })
    }

    // 验证登录测试
    if (req.path === '/api/user/login-test' && method === 'GET') {
        if (req.session.username) {
            return Promise.resolve(new SuccessModel({
                username: req.session.username
            }))
        }
        return Promise.resolve(new EroorModel('登录失败'))
    }
}