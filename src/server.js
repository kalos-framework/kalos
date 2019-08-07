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
        this.middleWares = [];
    }

    initialize() {
        if (this.opts.httpVersion === '2') {
            this.http = require('http2');
        } else {
            this.http = require('http');
        }

        emitter.emit('Server:init');
    }

    configRouter(router) {
        if (!(router instanceof Router)) {
            throw new Error('Must configure an instance of Router');
        }
        this.router = router;
    }

    use(middleWare) {
        if (!(middleWare instanceof MiddleWare)) {
            throw new Error('Must configure an instance of MiddleWare');
        }
        this.middleWares.push(middleWare);
        return this;
    }

    start(cb) {
        if (!this.http) {
            throw new Error('Failed to init HTTP server');
        }

        if (!this.router) {
            throw new Error('Must config Router before start server');
        }

        this.http.createServer((req, res) => {
            if (this.middleWares.length !== 0) {
                for (let i = 0; i < this.middleWares.length - 1; i++) {
                    this.middleWares[i].setNext(this.middleWares[i + 1])
                }
                this.middleWares[0].execute(req);
            }

            this.router.route(req, res);
        }).listen(this.opts.port, this.opts.ip, () => {
            log('started server at %s:%s', this.opts.ip, this.opts.port);
            if (cb && (typeof cb === 'function')) {
                cb(this.opts.ip, this.opts.port);

                emitter.emit('Server:started');
            }
        });
    }
}

export default Server;
