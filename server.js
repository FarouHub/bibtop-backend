var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Course = require('./api/models/courseModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://spartan:pioupiou123@cluster0-shard-00-00-hfhr2.mongodb.net:27017,cluster0-shard-00-01-hfhr2.mongodb.net:27017,cluster0-shard-00-02-hfhr2.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/courseRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);