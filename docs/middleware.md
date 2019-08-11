# Middleware

Middleware is a way to extend and provide cross-cutting concerns for the web applications.

- Parsing the body of the request.
- Compressing/decompressing requests and responses.
- Producing access logs.
- Managing sessions.
- Managing encrypted cookies.
- Providing Cross-site Request Forgery (CSRF) protection.
- etc...

## Structure

A middleware must be a function, and it can receive up to 3 parameters.

```js
function MIDDLEWARE_NAME(req, res, next) {
    // do something for your middleware
}
```

Parameters are:

- `req` : is the [Request]() object.
- `res` : is the [Response]() object.
- `next`: this is a function that is used to trigger next middleware in chain. 

**IMPORTANT: if you want to stop middleware at the moment, you should trigger `res.end()` or similar, to provide response to client; otherwise, the request will hang forever.**

## Register

To register middleware into server, use `server.use(middleware)`.

For example:

```js
const server = new Kalos.Server();

server.use((req, res, next) => {
    console.log('This is my middleware');
    next(); // to forward request to next middleware
});
```

You can also chain middleware registration.

```js
server
    .use(middleware1)
    .use(middleware2)
    .use(middleware3);
```

## Sequence Processing

Middlewares are processed in order they are registered into server, so it's a FIFO queue.

In a sense, a middleware can provide extra or remove features to the next middlewares. Therefore, be really careful when you try to decorate something into middleware chaining.
