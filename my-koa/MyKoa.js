const http = require('http')
const Context = require('./Context')
const Request = require('./Request')
const Response = require('./Response')


class MyKoa{
    constructor() {
        this.middlewares = []
        
    }

    listen(...args) {
        const app = http.createServer(async (req, res) => {
            console.log('-------')
            const ctx = this.createContext(req, res)

            // this.callback(ctx)
            // res.end(JSON.stringify(ctx.body))
            const fn = this.compose(...this.middlewares)
            await fn(ctx)
            console.log(ctx.body)
            res.end(JSON.stringify(ctx.body))
        })
        app.listen(...args)
    }

    use(callback) {
        this.middlewares.push(callback)
    }

    // 中间件复合
    compose(...middlewares) {
        return function(ctx) {
            return dispatch(0)
            function dispatch(i) {
                let fn = middlewares[i]
                if(!fn) return Promise.resolve()
                return Promise.resolve(
                    fn(ctx, function next() {
                        return dispatch(i+1)
                    })
                )
            }
        }
    }

    createContext(req, res) {
        const ctx = Object.create(Context)
        ctx.request = Object.create(Request)
        ctx.response = Object.create(Response)

        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
}

module.exports = MyKoa