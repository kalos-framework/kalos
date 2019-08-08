# module: Middleware


Using middleware to manipulate request and response for example:
- Parsing the body of the request
- Compressing/decompressing requests and responses
- Producing access logs
- Managing sessions
- Managing encrypted cookies
- Providing Cross-site Request Forgery (CSRF) protection

How to create an instance of `Middleware:`

```js
server.use((req, res, next) => {
   // middleware functionality here
   console.log("this is middleware");
   // next() to pass to another middleware
    next();
}).use((req, res, next) => {
    // check authenticate:
    if (isNotLogin(req)) {
        // if fail, stop to process next middleware
        res.statusCode = 401;
        res.end("You need to login... Go to login Page")
    } else {
        //if success process next middleware
        next();
    }
}).configRouter(route);
```
