# Development Guide

- Clone project and execute `npm install`.
- Add new module into `/src` directory.
- Always write log by creating a log function. For example:

```js
const log = require('debug')('kalos:router');

// in appropriate place, write log
log('value of x is %d', x);
```

- By default, log is not shown. To turn on logging, provide `DEBUG` environment key.

```
DEBUG=kalos:* babel-node index.js
```

- For simple test, add your test files into `test` directory.
- To execute a test file, use following command:

```js
babel-node test/your_test_file.js
```
