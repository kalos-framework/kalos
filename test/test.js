// var Server = require('../index.js');
//
// var app = new Server();
//
// app.hello('Server');
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
<<<<<<< Updated upstream
    router.handle(req, res);
=======
    router.route(req, res);

>>>>>>> Stashed changes
}).listen(1337);
