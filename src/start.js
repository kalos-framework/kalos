var http = require('http');
var dispatch = require('./dispatcher.js');

module.exports = function (ip, port) {
    var server = http.createServer(function (req, res) {
        // load the dispatcher here
        // this is the front controller
        dispatch(req, res);
        console.log('Handled ...');
    });

    server.listen(port || 8080, ip || '0.0.0.0');
};
