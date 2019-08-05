class Router {
    constructor() {
        // route store
        this._routes = {
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
    }

    register(method, path, handler) {
        this._routes[method][path] = handler;
    }

    get(method, path) {
        return this._routes[method][path];
    }
}

export default Router;
