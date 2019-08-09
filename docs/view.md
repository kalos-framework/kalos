# View

Kalos provides view templating out of the box by allowing to integrate with most of template engine based on NodeJS.

Framework uses [ejs](https://www.npmjs.com/package/ejs) template engine by default.

## View Engine

To config view engine for server, use following function:

```js
const server = new Kalos.Server();
server.viewEngine({
    engine: ,
    source: ,
    ext: ,
    options: ,
});
```

The options are following:

- `engine` : the template engine to be used for view rendering. Default to `ejs`.
- `source` : the absolute path to directory that contains all view files.
- `ext` : the extension of the view files to render. Default to `.ejs`, since `ejs` is the default template engine.
- `options` : options to render for view engine. Default value is `{}`, which means default value of corresponding template engine.

For example, if you want to use [pug](https://www.npmjs.com/package/pug), this is how to register:

```js
server.viewEngine({
    engine: require('pug'),
    source: require('path').join(__dirname),
    ext: 'pug',
    options: {}
});
```

However, you will need to install `pug` library into your project in order to use it.

## Methods

There are two supported methods bound to the `res` object to help view rendering.

### `res.render(template, data, options)`

Use it when you want to render a string into a string.

For example:

```js
const result = res.render('Hello <%=name%>', { name: 'Kalos' });

// it will return: 'Hello Kalos'
```

### `res.view(view_name, data, options, (err) => {})`

Use this when you want to render a view file, which is registered in the `source` directory.

This function will render result directly to client, so you don't have to reply manually.

You can catch error via last argument.

For example:

```js
router.get('/', (req, res) => {
    res.view('view', {name: 'Pete Houston'}, {}, (err) => {
        res.writeHead(500);
        res.end('error');
    })
});
```

