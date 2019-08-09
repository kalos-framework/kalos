import Kalos from "../index";
import bodyParser from 'body-parser';

const server = new Kalos.Server()
    .use(bodyParser.urlencoded())
    .get('/', (req, res) => {
        res.end('Hello!');
    })
    .post('/', (req, res) => {
        console.log('Query: ' + JSON.stringify(req.query));
        console.log('Form Body: ' + JSON.stringify(req.body));
        res.redirect(301, '/');
        // res.writeHead(201);
        // res.end();
    })
    .start((ip, port) => {
        console.log('server started at ' + ip + ':' + port);
    });
