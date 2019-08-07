class App {
    constructor() {
        this.stack = [];
    }

    use(m) {
        this.stack.push(m);
    }

    onError(err) {
        console.log('Error: ' + err);
    }

    handle(req, res) {
        const mw = this.stack.reverse();
        const next = (err) => {
            if (err) {
                return this.onError(err)
            }
            const fn = mw.pop();
            if (fn) {
                fn(req, res, next);
            }
        };
        next();
        console.log('Done handle');
    }

}

const app = new App();

app.use((req, res, next) => {
    console.log('First middleware');
    next();
});

app.use((req, res, next) => {
   console.log('Next middleware');
   next();
});

app.use((req, res, next) => {
    console.log('Last mw');

});

app.handle(1, 2);

