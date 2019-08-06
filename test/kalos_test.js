import Kalos from '../index';

const route = new Kalos.Router();

route.get('/hello', (req, res) => {
    res.send('Hello World');
});

route.get('/hello/:name', (req, res) => {
    res.send('Hello ' + req.params.name);
});

const emitter = Kalos.emitter;

emitter.on('Server:init', () => {
    console.log('Server inited');
});

emitter.on('Server:started', () => {
    console.log('Server Started');
});

const server = new Kalos.Server();
server.configRouter(route);
server.start((ip, port) => {
    console.log('Server started at: ' + ip + ':' + port);
});
