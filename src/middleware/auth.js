const jwt = require("jsonwebtoken");
const config = require("config");

export default function () {
    return (req, res, next) => {
        //get the token from the header if present
        const token = req.headers["x-access-token"] || req.headers["authorization"];
        //if no token found, return response (without going to the next middleware)
        if (!token) {
            res.statusCode = 401;
            res.end("Access denied. No token provided.");
        } else {
            try {
                //if can verify the token, set req.user and pass to next middleware
                const decoded = jwt.verify(token, config.get("key"));
                req.isAuth = true;
                next();
            } catch (ex) {
                //if invalid token
                res.statusCode = 400;
                res.end("Invalid token.");
            }

        }
    };
}
