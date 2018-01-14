
module.exports = function (express) {
  var jwtMiddleware = require('../../../src/middleware/token');
  var users = require('./users');
  var photos = require('./photos');
  var router = express.Router();

  router.get('/test', users.test);
  // authentication
  router.post('/login', users.login);

  //photos management
  router.put('/photos', jwtMiddleware, photos.register);
  router.get('/photos', jwtMiddleware, photos.retrieveAll);
  router.get('/photos/tag/:tag', jwtMiddleware, photos.tagSearch);
  router.get('/photos/people/:people', jwtMiddleware, photos.peopleSearch);
  router.get('/photos/location/:location', jwtMiddleware, photos.locationSearch);

  router.post('/photos/update/tags', jwtMiddleware, photos.tagUpdate);
  router.post('/photos/update/people', jwtMiddleware, photos.peopleUpdate);

  return router;
};
