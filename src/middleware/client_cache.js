export default function (options = {}) {
    let opts = options || {};

    return (req, res, next) => {
        console.log(opts);
        if(!Object.keys(opts).length){
           res.setHeader("Cache-Control","public");

           let expireDate = new Date();
           expireDate.setMinutes(expireDate.getMinutes() + 1);

           res.setHeader("Expires", expireDate);
           res.setHeader("Last-Modified", new Date());
        }else{
            for (let [key, value] of Object.entries(opts)) {
                res.setHeader(key,value);
            }
        }
        next();

    };
}
