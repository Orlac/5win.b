var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');  
var passport = require('passport');  

var logout = function (req, res, next) {
    req.logout();
    res.send(200);
};

var getUser = function(req, res, next) {
    
    if(req.user && req.user.id){
      res.send( { id: req.user.id } );   
    }else{
      return res.send(403); 
    }
};


var login = function(req, res, next) {
    // console.log('req', req);
    passport.authenticate('local', function(err, user, info) {
        console.log('err, user, info', err, user, info);
        if (err){
          return res.send(403, err); 
        }
        if (!user) {
          return res.status(403).send( {message:  'User not found'}); 
        }

        req.logIn(user, function(err) {
            if (err) { 
              return next(err); 
            }
            return res.status(200).send( { id: user.id } ); 
        });

    })(req, res, next);
};

module.exports = function (app) {
  app.get('/user', getUser);
  app.post('/user', login);
  app.post('/user/logout', logout);
};



// module.exports = router;