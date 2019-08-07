import http from 'http';
import Kalos from "../index";
import assert from 'assert';

const cookie = new Kalos.Cookie();

http.createServer((req, res) => {
    cookie.updateCookie(req,res);
    res.end("Test cookie completed");
    assert(cookie.cookieMap != null && cookie.cookieMap.size > 0);
}).listen(1337,() => {
    console.log("started at port 1337");
})
