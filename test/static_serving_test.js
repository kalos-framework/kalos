import http from 'http';
import Kalos from "../index";

const staticServing = new Kalos.StaticServing({sourceFolder:"samplefiles"});

http.createServer((req, res) => {
    staticServing.serve(req, res);
}).listen(1337,() => {
    console.log("started at port 1337");
})
