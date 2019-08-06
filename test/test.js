// var Kalos = require('../index.js');
//
// var app = new Kalos();
//
// app.hello('Kalos');
//
// app.get('/xxx', function (req, res) {
//    console.log('Get hooray');
// });
//
// app.start();
//

import Router from '../src/router';

import http from 'http';

let router = new Router();

router.get('/hello', (req, res) => {
    res.send('Hello World');
});

router.get('/hello/:name', (req, res) => {
    res.send('Hello ' + req.params.name);
});


http.createServer((req, res) => {
    router.route(req, res);
}).listen(1337);
