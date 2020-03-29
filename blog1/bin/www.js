const http = require('http')
const serverHandle = require('../app')

const server = http.createServer(serverHandle)

server.listen(3000, () => {
    console.log('server is running')
})