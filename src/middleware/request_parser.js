import url from "url";

export default function (req, res, next) {
    req = req || {};

    req.params = {};

    req.query = url.parse(req.url, true).query;
    req.queryparts = url.parse(req.url, true);

    req.rawBody = ''; // body of request
    req.on('data', c => {
        req.rawBody += c;
    });

    next();
}
