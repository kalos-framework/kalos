import Kalos from '../src/kalos';
import Router from '../src/router';

const route = new Router();

route.get('/hello', (req, res) => {
    res.send('Hello World');
});

route.get('/hello/:name', (req, res) => {
    res.send('Hello ' + req.params.name);
});

const server = new Kalos();
server.configRouter(route);
server.start();
