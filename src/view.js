var fs = require('fs');
var path = require('path');

class View{
    
    constructor(opts){
        this.opts = opts || {};
        this.engine = opts.defaultEngine || 'ejs';
        this.ext = opts.ext;
        this.dir = opts.dir || 'views';   
    }

    render(view, data){
            const engine = require(''+this.engine+'');
            engine.renderFile(path.join(path.resolve(this.dir), view + this.ext), data)
            .then(d => console.log(d))
            .catch(e => console.log('rendered error'));        
    }
    
}

export default View;