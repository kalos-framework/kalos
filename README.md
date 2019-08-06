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
import Server from 'kalos';

const app = new Server();

app.get('/hello', (req, res) => {
    console.log('Hello World');
});

app.get('/greet/{name}', (req, res) => {
    console.log('Hello ' + req.params.name);
});

app.start(); // by default, it starts on 127.0.0.1:8080
```
