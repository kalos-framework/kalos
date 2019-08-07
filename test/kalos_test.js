import Kalos from '../index';

const route = new Kalos.Router();

route.get('/hello', (req, res) => {
    res.send('Hello World');
});

route.get('/hello/:name', (req, res) => {
    res.send('Hello ' + req.params.name);
});

var md1 = new Kalos.MiddleWare((req, res) => {
    console.log("this is middle1");
    console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`);
    req.test1 = "1";
});

var md2 = new Kalos.MiddleWare((req, res) => {
    console.log("this is middle2");
    req.test2 = "2";
});

var md3 = new Kalos.MiddleWare((req, res) => {
    console.log("this is middle3");
    console.log("req.test1 =" + req.test1);
    console.log("req.test2 =" + req.test2);
});

const server = new Kalos.Server();
server.use(md1).use(md2).use(md3).configRouter(route);
server.start((ip, port) => {
    console.log('Server started at: ' + ip + ':' + port);
});
