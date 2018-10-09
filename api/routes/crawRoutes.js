'use strict';
module.exports = function(app) {
  var craw = require('../controllers/crawController');

  // craw Routes
  app.route('/posts')
    .get(craw.list_all)
    .post(craw.create)
    .delete(craw.delete);


  app.route('/posts/:postId')
    .get(craw.read)
    .put(craw.update);
    

  app.route('/craw').get(craw.craw);
  };