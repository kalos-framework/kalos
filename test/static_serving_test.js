import Kalos from '../index';

const server = new Kalos.Server();
server.static({
    source: require('path').resolve(__dirname)
});
server.configRouter(new Kalos.Router());

server.start(() => {
    console.log('server started');
});


