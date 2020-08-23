const koa = require('koa')
const app = new koa()
const session = require('koa-session')
// const session = require('koa-generic-session')

const redisStore = require('koa-redis')
const redis = require('redis')
const redisClient = redis.createClient(6379, 'localhost')
const wrapper = require('co-redis')
const client = wrapper(redisClient)

app.keys = ['some secret']
const SESS_CONFIG = {
	key: 'kkb:sess',
	// maxAge: 1000 * 60,
	// httpOnly: true,
	// signed: true,
	store: redisStore({ client }),
}

app.use(session(SESS_CONFIG, app))

app.use(async (ctx, next) => {
    console.log('------')
	const keys = await client.keys('*')
	keys.forEach(async key => console.log(await client.get(key)))
	await next()
})

app.use(ctx => {
	if (ctx.path === 'favicon.ico') return
	let n = ctx.session.count || 0
	ctx.session.count = ++n
	ctx.body = '第' + n + '次访问'
})
app.listen(3000)
