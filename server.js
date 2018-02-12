var config = require('./config');
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Course = require('./api/models/courseModel'),
  Ville = require('./api/models/villeModel'),  //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routesCourse = require('./api/routes/courseRoutes'); //importing route
var routesVille = require('./api/routes/villeRoutes');
routesCourse(app); //register the route
routesVille(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);