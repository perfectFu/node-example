module.exports = {
    get body() {
        return this.res._body
    },
    set body(val) {
        this.res._body = val
    }
}