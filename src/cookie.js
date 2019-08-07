let uuid = require('uuid/v4');
const log = require('debug')('kalos:cookie');

class Cookie{
    constructor(){
        this.cookieMap = new Map();
    }
    updateCookie(req,res) {
        let cookie  = this.parseCookie(req);

        if(cookie.get("client")== undefined || cookie.get("client")== ""){
            let clientId = uuid();
            cookie.set("client",clientId);

            //save cookie to cookieMap
            this.cookieMap.set(clientId,cookie);

            //update cookie to response
            res.setHeader("Set-Cookie",this.createCookie(cookie));
            log("create client cookie " + clientId);
            log("cookie map")
            log(this.cookieMap);
        }else{
            let savedCookie = this.retreiveCookie(cookie.get("client"));
            if(savedCookie != undefined || savedCookie != null){
                let newMap = new Map([...savedCookie, ...cookie]);

                //merge and save cookie to cookieMap
                this.cookieMap.set(newMap.get("client"),newMap);

                //update cookie to response
                res.setHeader("Set-Cookie", this.createCookie(newMap));
            }else{
                this.cookieMap.set(cookie.get("client"),cookie);
                res.setHeader("Set-Cookie", this.createCookie(cookie));
            }

            log("update client cookie");
            log("cookie map");
            log(this.cookieMap);
        }
    }
    parseCookie(req){
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
    createCookie(map){
        let cookies = [];
        for (let [key, value] of map) {
            cookies.push(key+"="+value);
        }
        return cookies;
    }
    retreiveCookie(clientId){
        return this.cookieMap.get(clientId);
    }

}
export default Cookie;
