'use strict';

var mongoose = require('mongoose'),
Ville = mongoose.model('ville');

exports.read_a_ville = function(req, res) {
  // TODO: {$regex: req.params.villeName}
  Ville.find({ SORT_NAME_RO: req.params.villeName, NAME_RANK: '1'}, function(err, ville) {
    if (err)
      res.send(err);
    res.json(ville);
  });
};

