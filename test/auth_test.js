const config = require('config');
const jwt = require('jsonwebtoken');

function generateAuthenToken() {

    // PAYLOAD
    var payload = {
        userId: "1",
        userName: "Cody",
    };

    // PRIVATE and PUBLIC key
    var privateKEY = config.get('myprivatekey');
    // var publicKEY = fs.readFileSync('./public.key', 'utf8');

    var i = 'Mysoft corp';          // Issuer
    var s = 'some@user.com';        // Subject
    var a = 'http://mysoftcorp.in'; // Audience

    // SIGNING OPTIONS
    var signOptions = {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: "12h",
        algorithm: "RS256"
    };

    const token = jwt.sign(payload, privateKEY);
    return token;

}

console.log("token = " + generateAuthenToken());
