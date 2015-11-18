
var AuthLocalStrategy = require('passport-local').Strategy;
var Promise = require('promise');
var users = require('./users');
var _ = require('lodash');

 
module.exports = function (passport, config, app) {


    passport.use('local', new AuthLocalStrategy(
        function (username, password, done) {
            console.log('username, password', username, password, users);
            var _user = _.find(users, function(u){ 
                return u.login == username && u.password == password; 
            }); 
            if (!_user) { 
                return done({ message: 'user not found ' + username }, false); 
            }
            console.log('_user', _user);   
            done(null, {
                id: _user.id,
                login: _user.login,
            });
        }
    ));

    
     
    passport.serializeUser(function (user, done) {
        done(null, user.id);
        console.log('serializeUser', user.id);
    });
     
     
    passport.deserializeUser(function (user_id, done) {
        console.log('deserializeUser', user_id);
        _getUser(user_id).then(function(user){
                done(null, user);
            }).catch(function(err){
                done(err);
            });
        
    });    
    
};

//-------------------------

var _getUser = function(id){
    return new Promise(function(resolve, reject){
        var user = _.find(users, function(u){ 
            return u.id == id; 
        });
        if(user){
            resolve(user);
        }else{
            reject();
        }    
    });
}