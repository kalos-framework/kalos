var router = require('./router');


module.exports = function (req, res) {
    var handler = router.get(req.method, req.url);

    if (!handler) {
        // TODO: handle not found handler route
        // need default handler
        console.log('Handler not found for: ' + req.url);
    } else {
        handler(req, res);
    }
};
