# module: Routing

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

```
import { Server } from 'kalos';

// ... create router and register routes

const server = new Server();
server.configRouter(router);
server.start();
```
