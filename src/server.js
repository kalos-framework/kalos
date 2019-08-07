import Router from './router';
import MiddleWare from './middleware';
import emitter from './event_emitter';

const log = require('debug')('kalos:server');

class Server {
    constructor(opts) {
        this.opts = opts || {};
        this.opts.httpVersion = this.opts.httpVersion || 'v1';
        this.opts.ip = this.opts.ip || '0.0.0.0';
        this.opts.port = this.opts.port || '8080';

        log('inited options: %o', this.opts);
        this.initialize();
        this.middleWare = new MiddleWare;
    }

    initialize() {
        if (this.opts.httpVersion === '2') {
            this.http = require('http2');
        } else {
            this.http = require('http');
        }

        emitter.emit('Server:initialize');
    }

    configRouter(router) {
        if (!(router instanceof Router)) {
            throw new Error('Must configure an instance of Router');
        }
        this.router = router;
        return this;
    }

    use(middleWare) {
        if (!(middleWare instanceof Function)) {
            throw new Error('Middleware must be a Function');
        }
        this.middleWare.use(middleWare);
        return this;
    }

    _handleError(req, res) {
        res.statusCode = 500;
        res.end('Internal Server Error');
    }

    start(onSuccess, onError) {
        if (!this.http) {
            throw new Error('Failed to init HTTP server');
        }

        if (!this.router) {
            throw new Error('Must config Router before start server');
        }

        this.http.createServer((req, res) => {
            this.middleWare.dispatch(req, res, (req, res, err) => {
                // fire error
                const errorHandler = onError || this._handleError;
                if (err) {
                    log('error while dispatching middleware stack: %o', err);
                    emitter.emit('Server:start:error', err);
                    return errorHandler(err);
                }
                // if success, let router handles
                this.router.handle(req, res);
            });
        }).listen(this.opts.port, this.opts.ip, () => {
            log('started server at %s:%s', this.opts.ip, this.opts.port);
            const successHandler = onSuccess || (() => {});
            successHandler(this.opts.ip, this.opts.port);

            emitter.emit('Server:start:success');
        });
    }
}

export default Server;
