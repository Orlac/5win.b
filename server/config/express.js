var express = require('express');
var glob = require('glob');

// var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
// var cookieSession = require('cookie-session');
var session = require('express-session');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');

module.exports = function(app, config, passport, webroot) {


  // bodyParser should be above methodOverride
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  
  app.use(methodOverride(function (req, res) {
    
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));
  
  
  app.use(cookieParser());
  app.use(session({
    secret: config.secret
  }));


  app.use(compress());
  app.use(methodOverride());

   // use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // Init controllers
  var controllers = glob.sync(webroot + '/server/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  // init models
  var models = glob.sync(webroot + '/server/models/*.js');
  models.forEach(function (model) {
    console.log('model', model);
    require(model);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500).send({
      message: err.message,  
    });
  });

};
