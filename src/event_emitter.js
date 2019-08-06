const log = require('debug')('kalos:event_emitter');

class EventEmitter {

    constructor() {
        this.events = {};
    }

    on(event, handler) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(handler);
        log('added new event: %s', event);
    }

    off(event, handler) {
        let handlers = this.events[event];
        if (handlers && handlers.length > 0) {
            const idx = handlers.indexOf(handler);
            if (idx >= 0) {
                handlers.splice(idx, 1);
                log('removed event handler from %s', event);
            }
        }
    }

    emit(event) {
        let handlers = this.events[event];
        if (handlers && handlers.length > 0) {
            let args = Array.prototype.splice.call(arguments, 1);
            for (let i = 0; i < handlers.length; i++) {
                const h = handlers[i];
                h.apply(this, args);
            }
        }
    }
}

export default EventEmitter;
