import Router from './src/router';
import Server from './src/server';
import EventEmitter from './src/event_emitter';
import StaticServing from './src/staticServing';
import Cookie from './src/cookie';
const Kalos = {
    Router,
    Server,
  // singleton: just one global emitter is enough for whole server
    emitter: EventEmitter,
    StaticServing,
    Cookie
};

export default Kalos;
