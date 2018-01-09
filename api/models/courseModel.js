'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CourseSchema = new Schema({
  
  name: {
    type: String
  }
  /*,
  description: {
    type: String
  },
  img: {
    type: String,
    default: 'running1.jpg'
  },
  date: {
    type: Date,
    default: Date.now
  },
  distance: {
    type: String
  },
  type: {
    type: [{
      type: String,
      enum: ['Trail', 'Cross', 'Course']
    }],
    default: ['Course']
  }*/
});

module.exports = mongoose.model('course', CourseSchema);
