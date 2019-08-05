var routes = {

    'GET': {},
    'POST': {},
    'PATCH': {},
    'PUT': {},
    'DELETE': {},
    'OPTIONS': {},
    'HEAD': {},
    '_ERROR': {

    }
};

module.exports.register = function (method, path, handler) {
    routes[method][path] = handler;
};

module.exports.get = function (method, path) {
    return routes[method][path];
};