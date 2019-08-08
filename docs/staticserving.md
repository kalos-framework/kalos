# Serve static files

By default, Kalos framework provides serve static files out of the box.

It can be configured easily via one function call:

```js
const server = new Kalos.Server();

server.static({
    source: require('path').resolve(__dirname)
});
```

There is only one option to config for static serving.

- `source` : the path to the directory which is used to serve static files.

It is always recommended to provide the absolute path to the `source` option.

## Supported formats

- By default support for the following mime types:
```js
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
```

## Example: Create a static file hosting

With this in mind, you can create a server to serve static files of your need.

```js
const server = new Kalos.Server();

server.static({
    source: require('path').resolve(__dirname)
});

server.configRouter(new Kalos.Router());

server.start((ip, port) => {
    console.log('server started at ' + ip + ':' + port);
});
```



