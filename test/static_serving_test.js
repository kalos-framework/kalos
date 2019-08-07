import http from 'http';
import StaticServing from "../src/staticServing"

const staticServing = new StaticServing({sourceFolder:"samplefiles"});

http.createServer((req, res) => {
    staticServing.serve(req, res);
}).listen(1337,() => {
    console.log("started at port 1337");
})
