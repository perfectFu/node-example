// const Koa = require('koa')
const Router = require('koa-router')
const Koa = require('./my-koa/MyKoa.js')
const app = new Koa()

const router = new Router()


// app.use((ctx) => {
//     ctx.body = [
//         {
//             name: 'tom'
//         }
//     ]
// })

// app.use((req, res) => {
//     res.end(JSON.stringify({name: 'tom'}))
// })

// app.use(ctx => {
//     ctx.body = {
//         name: '11111'
//     }
// })

// app.use(async (ctx, next) => {
//     ctx.body = '1'
//     await next()
//     ctx.body += '5'
// })

// app.use(async (ctx, next) => {
//     ctx.body += '2'
//     await next()
//     ctx.body += '4'
// })

// app.use(async (ctx, next) => {
//     ctx.body += '3'
//     await next()
// })

router.get('/index', async ctx => {
	ctx.body = 'index page'
})
router.get('/post', async ctx => {
	ctx.body = 'post page'
})
router.get('/list', async ctx => {
    console.log('----list')
	ctx.body = 'list page'
})
router.post('/index', async ctx => {
	ctx.body = 'post page'
})

app.use(router.routes())

app.listen(3000, () => {
	console.log('服务已启动：port:' + 3000)
})
