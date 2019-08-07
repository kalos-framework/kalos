const path = require('path'), fs = require('fs');
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

class StaticServing {

    constructor(opts) {
        this.opts = opts || {};
    }

    serve(req, res) {
        let result = false;

        // // parse URL
        const parsedUrl = url.parse(req.url);

        // extract URL path
        const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
        //let pathname = path.join(__dirname, sanitizePath);
        let pathname = path.join("." + path.sep + this.opts.sourceFolder, sanitizePath);

        if (fs.existsSync(pathname)) {
            result = true;

            fs.readFile(pathname, function (err, data) {
            // based on the URL path, extract the file extention. e.g. .js, .doc, ...
            const ext = path.parse(pathname).ext;
            // if the file is found, set Content-type and send data
            res.setHeader('Content-type', mimeType[ext] || 'text/plain');
            res.end(data);
            });
        }
        return result;
    }
}

export default StaticServing;
