'use strict';
module.exports = function(app) {
  var epreuves = require('../controllers/epreuveController');

  // courses Routes
  app.route('/epreuves')
    .get(epreuves.list_all_epreuves);

  app.route('/epreuves/search')
    .get(epreuves.search_epreuves);

  app.route('/epreuves/:epreuveId')
    .get(epreuves.read_a_epreuve)

};