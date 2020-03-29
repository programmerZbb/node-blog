let http = require('http')

const server = http.createServer((req, res) => {
    res.setHeader('Set-Cookie', 'testServer=11111111')
    res.setHeader('location', 'https://www.baidu.com')
    res.writeHead(200, {
        'content-type': 'text/html; charset=UTF-8'
    })
    res.end('<h1>新的测试数据</h1>')
})

server.listen(3001, () => {
    console.log('server is running')
})