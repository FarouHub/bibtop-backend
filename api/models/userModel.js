'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
 
  name: {
    type: String
  }

});

module.exports = mongoose.model('users', UserSchema);
