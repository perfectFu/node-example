const http = require('http')
const session = {}

const app = http.createServer((req, res) => {
    const { url, headers } = req
    const sessionKey = 'sid'
    const cookie = headers.cookie
    console.log('cookie: ', cookie)
    if(url === 'favicon.ico') {
        res.end('')
    }
    if(cookie && cookie.indexOf(sessionKey) > -1) {
        res.end('Come back!')
        const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
        const sid = pattern.exec(cookie)[1]
        console.log('session:', sid, session, session[sid])
    } else {
        const sid = (Math.random() * 9999999).toFixed()
        res.setHeader('Set-Cookie', `${sessionKey}=${sid}`)
        session[sid] = {
            name: 'laowang'
        }
        res.end('hello cookie!')
    }
})
app.listen(3000)