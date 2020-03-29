let http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
    // res.setHeader('Set-Cookie', 'testServer=11111111')
    // res.setHeader('location', 'http://127.0.0.1:3001')
    console.log('method:', req.method)
    console.log('url:', req.url)
    let query = querystring.parse(req.url.split('?')[1])
    console.log('query:', query)
    res.writeHead(200, {
        'content-type': 'text/plain; charset=UTF-8'
    })
    res.end(JSON.stringify(query))
})

server.listen(3000, () => {
    console.log('server is running')
})