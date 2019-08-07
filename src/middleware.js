class Middleware {
    constructor(handler) {
        this.handler = handler;
        this.next = null;
    }

    execute(req, res) {
        this.handler(req, res);
        this.next && this.next.execute(req, res);

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


