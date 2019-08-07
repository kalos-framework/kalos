const log = require('debug')('kalos:middleware');

class Middleware {
    constructor() {
        this.stack = [];
    }

    use(middleware) {
        // stack order LIFO
        this.stack.push(middleware);
    }

    dispatch(req, res, done) {
        const iterator = (index) => {
            if (index >= this.stack.length) {
                log("finish middleware, calling router....");
                return done(req, res);
            }
            try {
                this.stack[index].call(this, req, res, () => {
                    iterator.call(this, ++index);
                });
            } catch (e) {
                log("middleware error: %o", e);
                return done(req, res, e);
            }
        };

        iterator.call(this, 0);
    }
}

export default Middleware;
