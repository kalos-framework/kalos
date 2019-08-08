import Router from './src/router';
import Server from './src/server';
import MiddleWare from './src/middleware';
import EventEmitter from './src/event_emitter'
import StaticServing from './src/staticServing';
const Kalos = {
    Router,
    Server,
    MiddleWare,
    // singleton: just one global emitter is enough for whole server
    emitter: EventEmitter,
    StaticServing
};

export default Kalos;
