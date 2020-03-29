const http = require('http')

const server = http.createServer((req, res) => {
    console.log('content-type: ', req.headers['content-type'])
    req.on('data', (chunk) => {
        console.log(chunk.toString(), '--------接受的数据')
    })
    req.on('end', () => {
        console.log('接受数据结束')
    })
})

server.listen(3000, () => {
    console.log('server is running')
})