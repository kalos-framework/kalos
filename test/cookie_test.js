import Kalos from '../index';

const server = new Kalos.Server();

server.configRouter(new Kalos.Router());

server.start(() => {
    console.log('server started');
});
