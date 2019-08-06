class Middleware {
    constructor( handler) {
        this.handler = handler;
        this.next = null;
    }

    execute(req) {
        this.req = this.handler(req);
        if (this.req == null) {
            throw new Error('Handler must return request');
        } else {
            this.next && this.next.execute(this.req);

        }
    }

    setNext(middleWare) {
        if (!(middleWare instanceof Middleware)) {
            throw new Error('Must configure an instance of MiddleWare');
        } else {
            this.next = middleWare;
        }
    }

}

export default Middleware;


