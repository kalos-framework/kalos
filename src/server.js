import Router from './router';
import View from './view';
import MiddleWare from './middleware';
import emitter from './event_emitter';

import mwRequestParser from './middleware/request_parser';
import mwResponseSend  from './middleware/response_send';
import mwResponseJson  from './middleware/response_json';
import mwStaticServe   from './middleware/static_serve';
import mwResponseRender from './middleware/response_render';

const log = require('debug')('kalos:server');

class Server {
    constructor(opts) {
        this.opts = opts || {};
        this.opts.httpVersion = this.opts.httpVersion || 'v1';
        this.opts.ip = this.opts.ip || '0.0.0.0';
        this.opts.port = this.opts.port || '8080';
        this.router = this.opts.router || new Router();

        this.middleWare = new MiddleWare();
        this.viewEngine({});

        log('inited options: %o', this.opts);
        this.initialize();
    }

    initialize() {
        if (this.opts.httpVersion === '2') {
            this.http = require('http2');
        } else {
            this.http = require('http');
        }

        // push default middleware
        this.middleWare.use(mwRequestParser);
        this.middleWare.use(mwResponseSend);
        this.middleWare.use(mwResponseJson);
    }

    configRouter(router) {
        if (!(router instanceof Router)) {
            throw new Error('Must configure an instance of Router');
        }
        this.router = router;
        return this;
    }

    use(m) {
        if (!(m instanceof Function)) {
            throw new Error('Middleware must be a Function');
        }
        this.middleWare.use(m);
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

        return this;
    }

    stop(cb) {
        if (this.http) {
            this.http.close(() => {
                emitter.emit('Server:stop');
                if (cb != null && (typeof cb == 'function')) {
                    cb();
                }
            });
        }
    }

    /** Proxy event emitter **/
    on(event, handler) {
        emitter.on(event, handler);
    }

    off(event, handler) {
        emitter.off(event, handler);
    }

    static(options = {}) {
        this.use(mwStaticServe(options));
        emitter.emit('Server:static');
    }

    viewEngine(options = {}) {
        this.view = new View(options);
        this.use(mwResponseRender({
            engine: this.view.engine,
            source: this.view.source,
            ext: this.view.ext
        }));
        emitter.emit('Server:viewEngine');
    }

    /** Proxy the router methods **/
    add(method, path, handlers) {
        const args = Array.prototype.slice.call(arguments, 2);
        this.router.add(method, path, ...args);
        return this;
    }

    get(path, handlers) {
        const args = Array.prototype.slice.call(arguments, 1);
        this.router.get(path, ...args);
        return this;
    }

    post(path, hamdlers) {
        const args = Array.prototype.slice.call(arguments, 1);
        this.router.post(path, ...args);
        return this;
    }

    put(path, handlers) {
        const args = Array.prototype.slice.call(arguments, 1);
        this.router.put(path, ...args);
        return this;
    }

    patch(path, handlers) {
        const args = Array.prototype.slice.call(arguments, 1);
        this.router.patch(path, ...args);
        return this;
    }

    delete(path, handlers) {
        const args = Array.prototype.slice.call(arguments, 1);
        this.router.delete(path, ...args);
        return this;
    }

}

export default Server;
