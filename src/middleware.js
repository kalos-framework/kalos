class Middleware {
    constructor(handler) {
        this.middlewares = [];
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    executeMiddleware(req, res, router) {
        function iterator(index) {
            if (index === this.middlewares.length) {
                console.log("finish middleware, calling router....");
                return router.route(req, res);
            }
            try {
                this.middlewares[index].call(this, req, res, err => {
                    if (err) {
                        return console.log('There was an error: ' + err.message);
                    }
                    iterator.call(this, ++index);
                });
            } catch (e) {
                console.log("middleware error = " + e);
                res.statusCode = 500;
                res.end("something wrong");

            }
        }

        iterator.call(this, 0);
    }

}

export default Middleware;
