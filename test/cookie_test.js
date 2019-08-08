import Kalos from '../index';

const server = new Kalos.Server({port:1222});
const router = new Kalos.Router();

router.get("/hello",(req,res) => {
    console.log(res.headers.cookie);
    res.end("cookie tested");
});
server.configRouter(router);
server.start(() => {
    console.log('server started');
});
