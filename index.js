var start = require('./src/start.js');


function Kalos (opts) {
    if (! (this instanceof Kalos)) {
        return new Kalos(opts);
    }
}

Kalos.prototype.hello = function (name) {
    console.log('Hello: ' + name);

}

Kalos.prototype.start = start;

module.exports = Kalos;
