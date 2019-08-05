'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
    function Router() {
        _classCallCheck(this, Router);

        // route store
        this._routes = {
            'GET': {},
            'POST': {},
            'PATCH': {},
            'PUT': {},
            'DELETE': {},
            'OPTIONS': {},
            'HEAD': {},
            '_ERROR': {}
        };
    }

    _createClass(Router, [{
        key: 'register',
        value: function register(method, path, handler) {
            this._routes[method][path] = handler;
        }
    }, {
        key: 'get',
        value: function get(method, path) {
            return this._routes[method][path];
        }
    }]);

    return Router;
}();

exports.default = Router;