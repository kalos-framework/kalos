import Router from './src/router';
import Server from './src/server';


import MiddleWare from './src/middleware';
import EventEmitter from './src/event_emitter'
import Cookie from './src/middleware/cookie';
const Kalos = {
    Router,
    Server,
    MiddleWare,
    // singleton: just one global emitter is enough for whole server
    emitter: EventEmitter,
	Cookie
};

export default Kalos;
