const koa = require('koa')
const app = new koa()
const session = require('koa-session')

app.keys = ['some secret']
const SESS_CONFIG = {
    key: 'kkb:sess',
    maxAge: 1000 * 60,
    httpOnly: true,
    signed: true,
}

app.use(session(SESS_CONFIG, app))

app.use(ctx => {
    if(ctx.path === 'favicon.ico') return
    let n = ctx.session.count || 0
    ctx.session.count = ++n
    ctx.body = '第' + n + '次访问'
})
app.listen(3000)