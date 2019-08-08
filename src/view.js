import ejs from 'ejs';
import path from 'path';

class View {

    constructor(options = {}) {
        const opts = options || {};

        this.engine = opts.engine || ejs;
        this.source = opts.source || path.resolve(__dirname);
        this.ext = opts.ext || 'ejs';
        this.options = opts.options || {}; // default render options
    }

    render(template, data, options) {
        let opts = !!options ? Object.assign({}, this.options, options) : this.options;
        return this.engine.render(template, data, opts);
    }

    renderFile(view, data, options, done) {
        let opts = !!options ? Object.assign({}, this.options, options) : this.options;
        const viewpath = path.join(this.source, view + '.' + this.ext);

        this.engine.renderFile(viewpath, data, opts)
            .then(d => done(null, d))
            .catch(e => done(e))
        ;
    }
}

export default View;
