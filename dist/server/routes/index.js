'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routes;

var _app = require('../../../public/assets/app.server');

var _app2 = _interopRequireDefault(_app);

var _blogPosts = require('../controllers/blogPosts');

var _blogPosts2 = _interopRequireDefault(_blogPosts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function routes(app) {
  app.get('/blogPost', _blogPosts2.default.all, _blogPosts2.default.populateEachBotWithPosts, _blogPosts2.default.send);
  app.get('/api/post/:slug', _blogPosts2.default.one);

  app.get('*', function (req, res, next) {
    return (0, _app2.default)(req, res);
  });

  return app;
}