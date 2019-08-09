# Auhentication

Using Authentication Middleware to checking JWT token of each requests. 

**IMPORTANT: Authentication Middleware read configuration file to get the "key" to decode the token so that need to create a folder "config" in application:
```js
config/default.json:
      {
          "key": "kalos@123"
      }

```
## Register

To register authentication middleware into server, use `server.auth()`.

For example:

```js
const server = new Kalos.Server();

server.auth().use(otherMiddleware);
```


## Sequence Processing

Authentication Middleware checks token in request. If it's valid, request will have property "isAuthen = true" and be forwarded to next middlewares, otherwise there will be invalid token response 
