const authRoutes = require('./auth.routes');
const fileRoutes = require('./file.routes');

module.exports = function (app) {
  authRoutes(app);
  fileRoutes(app);
}