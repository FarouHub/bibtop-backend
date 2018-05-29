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
    query.title_req = {$regex : req.query.title};
  }

  let coefLat = 0.45;
  let coefLon = 0.65;

  if(req.query.rayon){
    let rayon = +req.query.rayon;
    coefLat = rayon/111;
    coefLon = rayon/76;
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

  Epreuve.find(query)
    .populate('epreuves')
    .sort({ "start_date": 1, "title": 1, "distance": 1 })
    .limit(15)
    .skip((+req.query.page-1)*15)
    .exec(function(err, epreuves) {
    if (err)
      res.send(err);
    res.json(epreuves);
  });
};
