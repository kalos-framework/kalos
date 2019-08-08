const path = require('path');
const fs = require('fs');
const url = require('url');

const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
};

export default function (options = {}) {
    let opts = options || {};
    opts.source = opts.source || path.resolve(__dirname);

    return (req, res, next) => {
        // parse URL
        const parsedUrl = url.parse(req.url);
        // extract URL path
        const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
        let pathname = path.join(opts.source, sanitizePath);

        if (fs.existsSync(pathname)) {
            fs.readFile(pathname, function (err, data) {
                if (err) {
                    console.log('error serve: ' + err);
                }
                // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                const ext = path.parse(pathname).ext;
                // if the file is found, set Content-type and send data
                res.setHeader('Content-type', mimeType[ext] || 'text/plain');
                res.end(data);
            });
        } else {
            next();
        }
    };


}
