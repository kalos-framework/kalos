import Kalos from '../index';

const route = new Kalos.Router();


route.get('/hello', (req, res) => {
    res.send('Hello World');
});

route.get('/hello/:name', (req, res) => {
    res.send('Hello ' + req.params.name);
});

const server = new Kalos.Server();
server.configRouter(route);

const staticServing = new Kalos.StaticServing({sourceFolder:"samplefiles"});
server.configStaticServing(staticServing);

server.start((ip, port) => {
    console.log('Server started a: ' + ip + ':' + port);
});
