'use strict';

var mongoose = require('mongoose'),
Epreuve = mongoose.model('epreuve');

exports.list_all_epreuves = function(req, res) {
  Epreuve.find({}).populate('epreuves').exec(function(err, epreuve) {
    if (err)
      res.send(err);
    res.json(epreuve);
  });
};

exports.read_a_epreuve = function(req, res) {
  Epreuve.findById(req.params.epreuveId).populate('epreuves').exec(function(err, epreuve) {
    if (err)
      res.send(err);
    res.json(epreuve);
  });
};

exports.search_epreuves = function(req, res) {

  let query = {};
  //console.log(req.query);
  if(req.query.title){
    query.title = {$regex : req.query.title};
  }
  if(req.query.ville){
    query.commune = {$regex : req.query.ville};
  }

  let coefLat = 0.4;
  let coefLon = 0.4;

  if(req.query.zoom < 5){
    coefLat = 5;
    coefLon = 7;
  }else if(req.query.zoom >= 5 && req.query.zoom < 7){
    coefLat = 4.5;
    coefLon = 6;
  }else if(req.query.zoom >= 7 && req.query.zoom < 10){
    coefLat = 2;
    coefLon = 1;
  }else if(req.query.zoom >= 10){
    coefLat = 0.4;
    coefLon = 0.4;
  }

  if(req.query.lat){
    query.lat = {$gte:(+req.query.lat-coefLat), $lte:(+req.query.lat+coefLat) };
  }
  if(req.query.long){
    query.long = {$gte:(+req.query.long-coefLon), $lte:(+req.query.long+coefLon) };
  }

  if(req.query.start_date && req.query.end_date){
    query.start_date = {$gte: new Date(req.query.start_date+'T00:00:00'), $lte: new Date(req.query.end_date+'T00:00:00')};
  }else if(req.query.start_date){
    query.start_date = {$gte: new Date(req.query.start_date+'T00:00:00')};
  }else if(req.query.end_date){
    query.start_date = {$lte: new Date(req.query.end_date+'T00:00:00')};
  }
  
  if(req.query.distanceMax && req.query.distanceMin){
    query.distance = {$lte: +req.query.distanceMax, $gte: +req.query.distanceMin};
  }else if(req.query.distanceMin){
    query.distance = {$gte: +req.query.distanceMin};
  }else if(req.query.distanceMax){
    query.distance = {$lte: +req.query.distanceMax};
  }

  let mTypes = [];
  if(req.query.trail){
    mTypes.push(req.query.trail);
  }
  if(req.query.route){
    mTypes.push(req.query.route);
  }
  if(req.query.cross){
    mTypes.push(req.query.cross);
  }
  if(req.query.bikeandrun){
    mTypes.push(req.query.bikeandrun);
  }

  if(mTypes.length > 0){
    query.type = { $in: mTypes };
  }

  Epreuve.find(query).populate('epreuves').exec(function(err, epreuves) {
    if (err)
      res.send(err);
    res.json(epreuves);
  });
};

