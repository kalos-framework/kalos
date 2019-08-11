import Kalos from '../index';

const server = new Kalos.Server();
//cache data for 300 seconds
server.configCache(new Kalos.Cache(300));
server.configRouter(new Kalos.Router());

server.start(() => {
    console.log('server started');
    console.log('Testing  cache');
    server.getCache().set("cache key","test cache");
    console.log('Get data from cache: ' +  server.getCache().get("cache key")) ;
    console.log('Test completed');
});
