import Kalos from '../index';

const route = new Kalos.Router();

route.get('/hello', (req, res) => {
    res.send('Hello World');
});

route.get('/hello/:name', (req, res) => {
    res.send('Hello ' + req.params.name);
});

var md1 = new Kalos.MiddleWare(req => {
    console.log("this is middle1");
    console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`);
    req.test1 = "1";
    return req;
});

var md2 = new Kalos.MiddleWare(req => {
    console.log("this is middle2");
    req.test2 = "2";
    return req;
});

var md3 = new Kalos.MiddleWare(req => {
    console.log("this is middle3");
    return req;
});

const server = new Kalos.Server();
server.use(md1).use(md2).use(md3).configRouter(route);
server.start((ip, port) => {
    console.log('Server started at: ' + ip + ':' + port);
});
