import Kalos from '../index';

const server = new Kalos.Server();

server.get('/hello', (req, res) => {
    res.send('Hello World');
});

server.get('/hello/:name', (req, res) => {
    res.send('Hello ' + req.params.name);
});

server.get('/', (req, res, next) => {
    console.log('handler 1'); next();
}, (req, res, next) => {
    console.log('handler 2'); next();
}, (req, res) => {
    res.end('DONE');
});

server.start((ip, port) => {
    console.log('Server started a: ' + ip + ':' + port);
});
