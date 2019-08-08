import Kalos from '../index';

const server = new Kalos.Server();
server.viewEngine({
    source: require('path').join(__dirname)
});

const router = new Kalos.Router();
router.get('/', (req, res) => {
    res.view('view', {name: 'Pete Houston'}, {}, (err) => {
        res.writeHead(500);
        res.end('error');
    })
});
server.configRouter(router);
server.start(() => {
    console.log('Server started.');
});
