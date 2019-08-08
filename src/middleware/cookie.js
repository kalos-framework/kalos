let uuid = require('uuid/v4');
const log = require('debug')('kalos:cookie');

export default function () {
    let cookieMap = new Map();

    function retrieveCookie(clientId){
        return cookieMap.get(clientId);
    }
    function parseCookie(req){
        let list = new Map();
        let cookie = req.headers.cookie;
        if(cookie != undefined){
            cookie.split(";").forEach(function(cookie){
                let parts = cookie.split("=");
                list.set(parts.shift().trim(),decodeURI(parts.join("=")));
            });
        }
        return list;
    }
    function createCookie(map){
        let cookies = [];
        for (let [key, value] of map) {
            cookies.push(key+"="+value);
        }
        return cookies;
    }
    return (req, res, next) => {
        let cookie  = parseCookie(req);

        if(cookie.get("client")== undefined || cookie.get("client")== ""){
            let clientId = uuid();
            cookie.set("client",clientId);

            //save cookie to cookieMap
            cookieMap.set(clientId,cookie);

            //update cookie to response
            res.setHeader("Set-Cookie", createCookie(cookie));
            log("create client cookie " + clientId);
            log("cookie map")
            log(cookieMap);
        }else{
            let savedCookie = retrieveCookie(cookie.get("client"));
            if(savedCookie != undefined || savedCookie != null){
                let newMap = new Map([...savedCookie, ...cookie]);

                //merge and save cookie to cookieMap
                cookieMap.set(newMap.get("client"),newMap);

                //update cookie to response
                res.setHeader("Set-Cookie", createCookie(newMap));
            }else{
                cookieMap.set(cookie.get("client"),cookie);
                res.setHeader("Set-Cookie", createCookie(cookie));
            }

            log("update client cookie");
            log("cookie map");
            log(cookieMap);
        }
        next();
    };
}
