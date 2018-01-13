module.exports = function (express) {
  var jwtMiddleware = require('../../../../src/middleware/token');
  var users = require('./users');
  var router = express.Router();

  // authentication
  router.post('/login', users.login);

  return router;
};
