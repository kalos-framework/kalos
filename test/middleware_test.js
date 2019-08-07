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
server.use((req, res, next) => {
    console.log("this is middle1");
    req.test1 = "1";
    next();

}).use((req, res, next) => {
    console.log("this is middle2");
    res.test2 = "2";

    next();
}).use((req, res, next) => {
    console.log("this is middle3");
    console.log("req.test1 = " + req.test1);
    console.log("res.test2 = " + res.test2);
    next();
}).use((req, res, next) => {
    // check authenticate:
    if (isNotLogin(res)) {
        res.statusCode = 401;
        res.end("You need to login... Go to login Page")
    } else {
        next();
    }
}).use((req, res, next) => {
    // check authorization:
    if (hasNotRole(res)) {
        res.statusCode = 401;
        res.end("You dont have role to go this page... Go to login Page")
    } else {
        next();
    }
}).configRouter(route);

function isNotLogin(res) {
    return false;
}

function hasNotRole(res) {
    return false;
}
server.start((ip, port) => {
    console.log('Server started at: ' + ip + ':' + port);
});
