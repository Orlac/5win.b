var path = require('path');
var express = require('express');
var config = require('./server/config/settings');
var passport = require('passport');
var mongoose = require('mongoose');

var app = express();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
connect();

// start node server and listen for requests
app.listen(config.port, 'localhost', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser\n', config.port, config.port);
});

require('./server/config/passport')(passport, config, app);
// Application middleware and environment configuration
require('./server/config/environment')(app, express, __dirname);
require('./server/config/express')(app, config, passport, __dirname);  

// Connect to mongodb
function connect () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
}