const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')

module.exports = (req, res) => {
    // 返回的格式 JSON
    res.setHeader('Content-type', 'application/json')
    let url = req.url
    req.path = url.split('?')[0]
    // 处理querystring
    req.query = querystring.parse(url.split('?')[1])

    // blog 接口处理
    const blogData = handleBlogRouter(req, res)
    if (blogData) {
        res.end(JSON.stringify(blogData))
        return
    }
    // 处理user请求
    const userData = handleUserRouter(req, res)
    if (userData) {
        res.end(
            JSON.stringify(userData)
        )
        return
    }

    // 处理 404
    res.writeHeader(404, {'Content-type': 'text/plain'})
    res.write('404 Not Found\n')
    res.end()
}