# Static Serving

You might want to use Static Serving when you want to:

- Load files on server from a config folder and its childs.

- By default support for the following mime types:
```js
    const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
};
```
## Register Static Serving with Server

```js
import { Server } from 'kalos';

// ... create router and register routes

const staticServing = new StaticServing({sourceFolder:"samplefiles"});
const server = new Server();
server.configStaticServing(staticServing);
server.start();
```
## Example
```js
//Static Serving finds test.html in folder: samplefiles
http://127.0.0.1:8080/test.html

//Static Serving finds test1.html in folder: samplefiles/childs
http://127.0.0.1:8080/childs/test1.html
```


