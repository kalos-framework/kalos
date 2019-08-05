var start = require('./src/start.js');
var methodGet = require('./src/get');


function Kalos (opts) {
    if (!(this instanceof Kalos)) {
        return new Kalos(opts);
    }
}

Kalos.prototype.hello = function (name) {
    console.log('Hello: ' + name);
};

Kalos.prototype.start = start;
Kalos.prototype.get = methodGet;

module.exports = Kalos;
