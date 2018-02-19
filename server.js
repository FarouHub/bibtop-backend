var config = require('./config');
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Epreuve = require('./api/models/epreuveModel'),
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

var routesEpreuve = require('./api/routes/epreuveRoutes'); //importing route
var routesVille = require('./api/routes/villeRoutes');

routesEpreuve(app); //register the route
routesVille(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);