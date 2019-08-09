import Router from '../src/router';
import Kalos from '../index';

const router = new Router();

router.get('/', (req, res, next) => {
    console.log('handler 1');
    next();
}, (req, res) => {
    console.log('handler 2');
    res.end('OK');
});

router.get('/hello', (req, res, next) => {
    console.log('handler 3');
    next();
});

router.get('/hello', (req, res) => {
    console.log('handler 4');
    res.end('KK');
});

const server = new Kalos.Server();
server.configRouter(router);
server.start();
//
// function add(method, path, handler) {
//     const args = Array.prototype.splice.call(arguments, 2);
//     console.log(typeof args);
//     console.log( args.length);
//     console.log(typeof args[0]);
// }
//
// function get(path, handler) {
//     // add('GET', path, handler);
//     console.log(arguments.length);
//     add.call(this, ...arguments);
// }
//
// get( '/', () => {}, () => {}, () => {});
