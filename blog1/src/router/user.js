module.exports = (req, res) => {
    let method = req.method
    console.log(method, '-----测试')
    if (req.path === '/api/user/login' && method === 'POST') {
        return '用户登录接口'
    }
}