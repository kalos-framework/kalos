# kalos

A minimal web server framework based on NodeJS.

Features include:

- Routing
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
import Kalos from 'kalos';

const app = new Kalos();

app.get('/hello', (req, res) => {
    console.log('Hello World');
});

app.get('/greet/{name}', (req, res) => {
    console.log('Hello ' + req.params.name);
});

app.start(); // by default, it starts on 127.0.0.1:8080
```
