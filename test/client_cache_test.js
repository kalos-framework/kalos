import Kalos from '../index';

const server = new Kalos.Server();

const router = new Kalos.Router();
router.get("/hello",(req,res) => {
   console.log(res);
   res.end("Test client cache");
});
server.configRouter(router);

server.start(() => {
    console.log('server started');
});
