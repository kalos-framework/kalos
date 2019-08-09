import url from "url";

export default function (req, res, next) {
    req.query = url.parse(req.url, true).query;

    next();
}
