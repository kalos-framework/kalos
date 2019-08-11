import path from "path";

export default function (config = {}) {
    /**
     * config = {
     *    engine: ViewEngine
     *    source: path of view directory
     *    ext   : extension of view file to parse
     * }
     */
    return (req, res, next) => {
        res.render = (template, data, options) => {
            let opts = !!options ? Object.assign({}, options) : {};
            return config.engine.render(template, data, opts);
        };

        res.view = (view, data, options, done = () => {}) => {
            let opts = !!options ? Object.assign({}, options) : {};
            const viewpath = path.join(config.source, view + '.' + config.ext);

            let res = config.engine.renderFile(viewpath, data, opts);

            if (res instanceof Promise) {
                res.then(d => res.end(d))
                    .catch(e => {
                        done(e);
                    });
            }
            return res;
        };

        next();
    }
}
