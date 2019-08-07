import emitter from './event_emitter';

const log = require('debug')('kalos:middleware');

class Middleware {
    constructor() {
        this.stack = [];
    }

    use(middleware) {
        // stack order LIFO
        this.stack.push(middleware);
        emitter.emit('Middleware:use', middleware);
    }

    dispatch(req, res, done) {
        emitter.emit('Middleware:dispatch', req, res);

        const iterator = (index) => {
            if (index >= this.stack.length) {
                log("finish middleware, calling router....");
                emitter.emit('Middleware:dispatch:success', req, res);
                return done(req, res);
            }

            try {
                this.stack[index].call(this, req, res, () => {
                    emitter.emit('Middleware:dispatch:next', index);
                    iterator.call(this, ++index);
                });
            } catch (e) {
                log("middleware error: %o", e);
                emitter.emit('Middleware:dispatch:error', e);
                return done(req, res, e);
            }
        };

        iterator.call(this, 0);
    }
}

export default Middleware;
