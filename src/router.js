import url from 'url';
import { trimslashes } from "./utils";

const log = require('debug')('kalos:router');

// TODO provide route group if possible

class Router {
    constructor(opts) {
        this.opts = opts || {};
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

    route(req, res) {
        req = this._wrapRequest(req);
        res = this._wrapResponse(res);

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
            return this._handle404(req, res);
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

    _wrapRequest(req) {
        req = req || {};

        req.params = {};

        req.query = url.parse(req.url, true).query;
        req.queryparts = url.parse(req.url, true);

        req.rawBody = ''; // body of request
        req.on('data', c => {
            req.rawBody += c;
        });

        return req;
    }

    _wrapResponse(res) {
        res = res || {};

        // overwrite for better usage
        res.send = (body, contentType, statusCode) => {
            res.charset = res.charset || 'utf-8';
            res.statusCode = statusCode || res.statusCode || 200;
            res.body = body;
            res.headers = 'text/html'; // default

            if (contentType) {
                res.setHeader('Content-Type', contentType);
            } else {
                res.setHeader('Content-Type', 'text/html');
            }

            if (typeof body === 'string') {
                if (!res.getHeader('Content-Type')) {
                    res.setHeader('Content-Type', 'text/html');
                }
            } else {
                body = JSON.stringify(body);
            }

            res.write(body);
            res.end();
        };

        res.json = (body) => {
            res.setHeader('Content-Type', 'application/json');
            return res.send(body, 'application/json', 200);
        };

        return res;
    }
}

export default Router;
