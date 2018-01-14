/**
* Validates that the request contains a secret token.
*
* @module middleware
*/

var config = require('config');
var jwt = require('jwt-simple');

module.exports = function(req, res, next) {
    var token; // if possible get token from Bearer pattern, else take x-access-token

    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        // v3 authorization via Bearer Token
        var bearer = bearerHeader.split(" "); // unpack the bearer token
        token = bearer[1];
    } else {
        // v2 authorization via x-access-token
        token = req.body.token || req.query.token || req.headers['x-access-token'];
    }

    // if a token is given --> proceed else throw error
    if (token) {
        var payload;

        try {
            payload = jwt.decode(token, config.jwtSecret);
        }
        catch (err) {
            return res.end(res.writeHead(401, 'DECODE_ERR'));
        }

        if (payload == null) {
            return res.end(res.writeHead(401, 'NO_PAYLOAD'));
        } else {
            req.payload = payload;
            next()
        }
    } else {
        return res.end(res.writeHead(403, 'NO_TOKEN'));
    }
}