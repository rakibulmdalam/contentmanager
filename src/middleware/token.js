var config = require('config');
var jwt = require('jwt-simple');

module.exports = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    var payload = jwt.decode(token, config.jwtSecret)

    if (payload == null) {
      return res.status(401).json({
        message: 'Unauthorized request.',
        status: 401
      });
    } else {
      req.user = payload;
      next()
    }
  } else {
    return res.status(403).json({
      status: 403,
      message: 'No token provided.'
    });
  }
}
