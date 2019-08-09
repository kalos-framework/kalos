import Kalos from '../index';
import cookieParser from 'cookie-parser';

const server = new Kalos.Server()
    .use(cookieParser())
    .get('/', (req, res) => {
        res.end('Home');
    })
    .get('/hello/:name', (req, res) => {
        res.end('Hello ' + req.params.name);
    })
    .get('/cookies', (req, res) => {
        console.log(req.cookies);
        res.end('Cookie');
    })
    .start((ip, port) => {
        console.log('Server started a: ' + ip + ':' + port);
    });
