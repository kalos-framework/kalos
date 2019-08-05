function Kalos (opts) {
    if (! (this instanceof Kalos)) {
        return new Kalos(opts);
    }
}

Kalos.prototype.hello = function (name) {
    console.log('Hello: ' + name);

}

module.exports = Kalos;
