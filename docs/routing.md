# module: Routing

## 1. Routes

All routing in Kalos are handles by `Router` object.

You will need to create an instance of `Router`.

```js
import { Router } from 'kalos';

const router = new Router();
```

Next step is to register your routes and handlers.

```js
const homeController = function (req, res) {
    // do something with home controller;  
};
router.get('/', homeController);
```

By default, Kalos supports most of HTTP verbs.

- `get(path, handler)` : for HTTP GET.
- `post(path, handler)` : for HTTP POST.
- `put(path, handler)` : for HTTP PUT.
- `patch(path, handler)` : for HTTP PATCH.
- `delete(path, handler)` : for HTTP DELETE.

If there is any missing verb, you can use `add(method, path, handler)` to specify your own verbs.
It also works with common verbs.

```js
router.add('OPTIONS', '/resource', () => {});
router.add('GET', '/resource', () => {});
```

The final step is to bind the router to Kalos `Server` instance, which can be done by:

```js
import { Server } from 'kalos';

// ... create router and register routes

const server = new Server();
server.configRouter(router);
server.start();
```

## 2. Route Parameters

All route parameters are parsed into `req.params` object.

Kalos uses named routing for route parameters. So if you register route like this `/hello/:name` , this route parameter will be bound to `name`.

```js
route.get('/hello/:name', (req, res) => {
    res.send('Hello ' + req.params.name);
});

// 127.0.0.1:8080/hello/kalos  =>  response: 'Hello kalos'
```

Route parameters can be nested.

```js
route.get('/category/:cat_id/book/:book_id', (req, res) => {
    console.log('Category: ' + req.params.cat_id);
    console.log('Book: ' + req.params.book_id);
    res.end();
});
```

## 3. Query parameters

Query parameters can be retrieved from route in a similar fashion, they are stored in `req.query` object.

```js
route.get('/filter?q=framework&sort=desc', (req, res) => {
    console.log('Search keyword: ' + req.query.q);
    console.log('Sort order: ' + req.query.sort);
    res.end();
});
```

### 4. Route middleware

Similar to global app middleware that is applied for all routes, route middleware only works on specific routes that set.

The syntax is not different from basic route declaration.

```js
const middleware1 = (req, res, next) => {
    // do something
    ...
    
    next();
};

const middleware2 = (req, res, next) => {
    // do something
    ...
    
    next();
};

route.get('/ROUTE', middleware1, middleware2, ..., (req, res) => {
    // route handler
});
```

You can put any number of middlewares as argument; however, the last one should be a route handler, which should always make response to client request.

For example, if you want to provide authentication check for user, you might need to do this:

```js
const isLogin = (req, res, next) => {
    // do some checking
    if (loggedIn) { next(); }
    else {
        res.writeHead(401);
        res.end('Not Authenticated');
    }
};

const isUserRole = (req, res, next) => {
    if (userData.role == 'USER') { next(); }
    else {
        res.writeHead(403);
        res.end('Access Forbidden');
    }
};
route.get('/user/profile', isLogin, isUserRole, (req, res) => {
    const user = load_user_info();
    res.render('user_profile', user);
});
```
