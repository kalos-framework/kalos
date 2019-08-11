import Kalos from '../index';
import bodyParser from 'body-parser';
import path from 'path';

const names = ['pete', 'luan'];

const server = new Kalos.Server()
    .use(bodyParser.urlencoded())
    .static({
        source: path.join(__dirname, 'public')
    })
    .viewEngine({
        source: path.join(__dirname, 'views'),
        ext: 'ejs'
    })
    .get('/', (req, res) => {
        res.view('index', { names });
    })
    .post('/', (req, res) => {
        if (req.body.name) {
            names.push(req.body.name);
        }
        res.redirect(302, '/');
    })
    .start((ip, port) => {
        console.log('server started at ' + ip + ':' + port);
    });
