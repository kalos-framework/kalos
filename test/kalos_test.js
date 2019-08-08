import Kalos from '../index';

const route = new Kalos.Router({
    notFoundHandler: function (req, res) {
        res.writeHead(404);
        res.end('Route ' + req.url + ' not found.');
    }
});


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

const cookie = new Kalos.Cookie();
server.configCookie(cookie);

server.start((ip, port) => {
    console.log('Server started a: ' + ip + ':' + port);
});
