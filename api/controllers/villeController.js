'use strict';

var mongoose = require('mongoose'),
Ville = mongoose.model('ville');

exports.read_a_course = function(req, res) {
  Ville.find({ FULL_NAME_RO : req.params.villeName}, function(err, ville) {
    if (err)
      res.send(err);
    res.json(ville);
  });
};

