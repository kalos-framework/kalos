# Server

Kalos framework starts from `Server` component. You can:

- create/start/stop server.
- add routes to server, such as `GET`, `POST`, `PUT`...
- handle server framework events.
- provide view template engine.
- serve static files.
- manage middlewares.

This is a sample to get started with the framework.

```js
import Kalos from 'kalos';
import cookieParser from 'cookie-parser';

const server = new Kalos.Server()
    .use(cookieParser())
    .get('/', (req, res) => {
        res.end('Home');
    })
    .get('/hello/:name', (req, res) => {
        res.end('Hello ' + req.params.name);
    })
    .get('/cookies', (req, res) => {
        console.log(req.cookies);
        res.end('Cookie');
    })
    .start((ip, port) => {
        console.log('Server started a: ' + ip + ':' + port);
    });
```
