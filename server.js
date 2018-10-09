
var express = require('express'),
  app = express(),
  port = process.env.PORT || 1233,
  mongoose = require('mongoose'),
  Task = require('./api/models/crawModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mydb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/crawRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('Craw server started on: ' + port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });
