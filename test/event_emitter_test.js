import Kalos from '../index';

const emitter = Kalos.emitter;

const hello = (name) => {
    console.log('hello ' + name);
};

const server = new Kalos.Server();
emitter.on('Server:initialize', hello);

server.on('Server:start:success', () => {
    console.log('Yeah Yeah');
});
server.start();


