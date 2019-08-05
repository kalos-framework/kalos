'use strict';

var router = require('./router');

module.exports = function (path, handler) {
    router.register('GET', path, handler);
};