export default function (req, res, next) {
    res.json = (body, statusCode) => {
        // res.charset = res.charset || 'utf-8';
        // res.statusCode = statusCode || res.statusCode || 200;
        res.writeHead(statusCode || res.statusCode || 200);
        res.body = body;
        // res.headers = 'text/html'; // default
        res.setHeader('Content-Type', 'application/json');

        body = JSON.stringify(body);

        res.write(body);
        res.end();
    };

    next();
}
