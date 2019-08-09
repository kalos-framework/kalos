import url from 'url';
import { trimslashes } from "./utils";
import emitter from './event_emitter';

const log = require('debug')('kalos:router');

// TODO provide route group if possible

class Router {
    constructor(opts = {}) {
        this.opts = opts || {};
        this.notFoundHandler = this.opts.notFoundHandler || this._handle404;
        this.errorHandler = this.opts.errorHandler || this._handle500;
        this._routes = [];
    }

    _handle404(req, res) {
        res.writeHead(404);
        res.end('Route Not Found');
    }

    _handle500(req, res) {
        res.writeHead(500);
        res.end('Internal Server Error');
    }

    add(method, path, handlers) {
        let routes = this._routes.filter(r => r.method === method && r.path === path);
        if (routes && routes.length > 0) {
            this._routes = this._routes.filter(r => r.method !== method || r.path !== path);
            routes = routes[0];
        } else {
            routes = {
                method,
                path,
                handlers: [],
            };
        }

        const args = Array.prototype.splice.call(arguments, 2);
        if (args.length < 1) {
            throw new Error('Must provide a handler for route: ' + method + ' ' + path);
        }
        args.forEach(h => {
            if (typeof h !== 'function') {
                throw new Error('Handler must be a Function');
            }
            routes.handlers.push(h);
        });

        this._routes.push(routes);

        log('added new route: [method=%s, path=%s]', method, path);
        emitter.emit('Router::add', method, path);
    }

    get(path, handler) {
        const args = Array.prototype.slice.call(arguments, 1);
        this.add.call(this, 'GET', path, ...args);
    }

    post(path, handler) {
        const args = Array.prototype.slice.call(arguments, 1);
        this.add.call(this, 'POST', path, ...args);
    }

    put(path, handler) {
        const args = Array.prototype.slice.call(arguments, 1);
        this.add.call(this, 'PUT', path, ...args);
    }

    patch(path, handler) {
        const args = Array.prototype.slice.call(arguments, 1);
        this.add.call(this, 'PATCH', path, ...args);
    }

    delete(path, handler) {
        const args = Array.prototype.slice.call(arguments, 1);
        this.add.call(this, 'DELETE', path, ...args);
    }

    handle(req, res) {
        log('handling router for %s %s', req.method, req.url);
        let path = trimslashes(url.parse(req.url).pathname);
        let method = req.method;

        let urlParams = path.split('/');

        let filteredRoutes = this._routes.filter(r => {
            r.path = trimslashes(r.path);
            let params = r.path.split('/');

            // if segments count not the same, then not valid
            if (params.length !== urlParams.length) return false;

            let namedParams = params.filter(p => {
               return p.includes(':');
            });

            let found = []; // store match routes
            for (let i = 0; i < params.length; i++) {
                if (params[i].includes(':')) {
                    found.push(urlParams[i]);
                }
            }

            if (found.length > 0) {
                namedParams.forEach((e, idx) => {
                    // extract name params key and value, then bind to req object
                    req.params[e.substr(1, e.length)] = found[idx];
                });
            }

            let counter = 0;
            // re-count actual matching on url params
            for (let i = 0; i < urlParams.length; i++) {
                if (urlParams[i] === params[i] || params[i].includes(':')) counter++;
            }
            // compare again to validate if it is a matching route
            return counter === urlParams.length && method === r.method;
        });

        // no matching route, dispatch 404
        if (!filteredRoutes || filteredRoutes.length < 1) {
            emitter.emit('Router:handle:notfound', req.method, req.url);
            return this.notFoundHandler(req, res);
        }

        log('filteredRoutes: %o', filteredRoutes);

        // invoke the handler
        filteredRoutes.forEach(r => {
            // fire list of route handlers
            // last one is the real handler
            const handlers = r.handlers.slice(0).reverse();
            function next(err) {
                if (err) {
                    return this.errorHandler(req, res);
                }
                const fn = handlers.pop();
                if (fn && (typeof fn === 'function')) {
                    fn(req, res, next);
                }
            }
            next();
        });

    }

    totalRoutes() {
        return this._routes.length;
    }
}

export default Router;
