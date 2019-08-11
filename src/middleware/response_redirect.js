export default function (req, res, next) {
    res.redirect = (statusCode = 302, url) => {
        res.writeHead(statusCode, {
            'Location': url
        });
        res.end();
    };

    next();
}
