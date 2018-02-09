'use strict';
module.exports = function(app) {
  var villes = require('../controllers/villeController');

  // villes Routes
  app.route('/villes/:villeName')
    .get(villes.read_a_course);

};