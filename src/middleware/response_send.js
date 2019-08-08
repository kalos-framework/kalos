export default function (req, res, next) {
    res.send = (body, contentType, statusCode) => {
        res.charset = res.charset || 'utf-8';
        res.statusCode = statusCode || res.statusCode || 200;
        res.body = body;
        res.headers = 'text/html'; // default

        if (contentType) {
            res.setHeader('Content-Type', contentType);
        } else {
            res.setHeader('Content-Type', 'text/html');
        }

        if (typeof body === 'string') {
            if (!res.getHeader('Content-Type')) {
                res.setHeader('Content-Type', 'text/html');
            }
        } else {
            body = JSON.stringify(body);
        }

        res.write(body);
        res.end();
    };

    next();
}
