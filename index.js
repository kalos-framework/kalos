import Router from './src/router';
import Server from './src/server';
import EventEmitter from './src/event_emitter'

const Kalos = {
    Router,
    Server,
    // singleton: just one global emitter is enough for whole server
    emitter: new EventEmitter(),
};

export default Kalos;
