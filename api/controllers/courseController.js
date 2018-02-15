'use strict';

var mongoose = require('mongoose'),
Course = mongoose.model('course');

exports.list_all_courses = function(req, res) {
  Course.find({}, function(err, course) {
    if (err)
      res.send(err);
    res.json(course);
  });
};

exports.search_courses = function(req, res) {

  let query = {};
  console.log(req.query);
  if(req.query.title){
    query.title = {$regex : req.query.title};
  }
  if(req.query.ville){
    query.commune = {$regex : req.query.ville};
  }
  if(req.query.lat){
    query.lat = {$gte:(+req.query.lat-0.4), $lte:(+req.query.lat+0.4) };
  }
  if(req.query.long){
    query.long = {$gte:(+req.query.long-0.4), $lte:(+req.query.long+0.4) };
  }

  //console.log(query);

  Course.find(query, function(err, course) {
    if (err)
      res.send(err);
    res.json(course);
  });
};

exports.create_a_course = function(req, res) {
  var new_course = new Course(req.body);
  new_course.save(function(err, course) {
    if (err)
      res.send(err);
    res.json(course);
  });
};

exports.read_a_course = function(req, res) {
  Course.findById(req.params.courseId, function(err, course) {
    if (err)
      res.send(err);
    res.json(course);
  });
};

exports.update_a_course = function(req, res) {
  Course.findOneAndUpdate({_id: req.params.courseId}, req.body, {new: true}, function(err, course) {
    if (err)
      res.send(err);
    res.json(course);
  });
};

exports.delete_a_course = function(req, res) {

  Course.remove({
    _id: req.params.courseId
  }, function(err, course) {
    if (err)
      res.send(err);
    res.json({ message: 'Course successfully deleted' });
  });
};
