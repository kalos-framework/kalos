import Kalos from '../index';

const emitter = new Kalos.EventEmitter();

const hello = (name) => {
    console.log('hello ' + name);
};

// test on
emitter.on('hello', hello);

emitter.emit('hello', 'pete');

// test off
emitter.off('hello', hello);

emitter.emit('hello', 'pete');


