import url from 'url';
import { trimslashes } from "./utils";
import emitter from './event_emitter';

const log = require('debug')('kalos:router');

// TODO provide route group if possible

class Router {
    constructor(opts) {
        this.opts = opts || {};
        this.notFoundHandler = this.opts.notFoundHandler || this._handle404;
        this._routes = [];
    }

    _handle404(req, res) {
        res.writeHead(404);
        res.end('Route Not Found');
    }

    add(method, path, handler) {
        if (typeof handler !== 'function') {
            throw new Error('Handler must be a valid function');
        }

        this._routes.push({
            method,
            path,
            handler,
        });

        log('added new route: [method=%s, path=%s]', method, path);
        emitter.emit('Router::add', method, path);
    }

    get(path, handler) {
        this.add('GET', path, handler);
    }

    post(path, handler) {
        this.add('POST', path, handler);
    }

    put(path, handler) {
        this.add('PUT', path, handler);
    }

    patch(path, handler) {
        this.add('PATCH', path, handler)
    }

    delete(path, handler) {
        this.add('DELETE', path, handler);
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

        // invoke the handler
        filteredRoutes.forEach(r => {
            req.on('end', () => {
                if (req.rawBody !== '') {
                    // _debug('handling route: %s', req.headers['content-type']);
                    // parse body for route
                    let body;

                    if (req.headers['content-type'] === 'application/json') {
                        body = JSON.parse(req.rawBody);
                    } else if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
                        body = require('querystring').parse(req.rawBody); // same as default
                    } else {
                        body = require('querystring').parse(req.rawBody);
                    }

                    req.body = body;
                }

                r.handler(req, res);
            });
        });

    }

    totalRoutes() {
        return this._routes.length;
    }
}

export default Router;
