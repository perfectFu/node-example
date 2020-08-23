const http = require('http')

const app = http.createServer((req, res) => {
    const { url, headers } = req
    console.log('url:', url)
    if(url === 'favicon.ico') {
        res.end('')
    }
    console.log('cookie:', headers.cookie)
    res.setHeader('Set-Cookie', 'cookie1=abc')
    res.end('hello cookie!')
}).listen(3000)