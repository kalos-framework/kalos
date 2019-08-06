# kalos

A minimal web server framework based on NodeJS.

Features include:

- Routing
- Handle requests (headers, params, ...)
- Authentication
- Cookie
- Middleware (filter)
- Static serving.
- Views.
- Configuration (+autoconfig)
- Validation (for form requests)
- Logging

## Installation

```
npm install kalos
```

## Usage

```js
import { Server, Router } from 'kalos';

const router = new Router();

router.get('/hello', (req, res) => {
    res.send('Hello World');
});

router.get('/hello/:name', (req, res) => {
    res.send('Hello ' + req.params.name);
});

const server = new Server();
server.configRouter(router);
server.start((ip, port) => {
    console.log('Server started at: ' + ip + ':' + port);
});
```
