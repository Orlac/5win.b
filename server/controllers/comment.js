var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');  
var passport = require('passport');  

var getComments = function (req, res, next) {
	mongoose.model('Comment')
		.find()
		.paginate(req.query.page || 1, 10)
		.exec(function(err, docs) {
			if(err){
				return res.status(500).send(err);
			}
			res.status(200).send(docs);
		});
    // res.send(200, data);
};

var postComment = function (req, res, next) {
    res.status(200).send([]);
    // res.send(200, data);
};

var editComment = function (req, res, next) {
    res.status(200).send([]);
    // res.send(200, data);
};

var deleteComment = function (req, res, next) {
    res.status(200).send([]);
    // res.send(200, data);
};

var like = function (req, res, next) {
    res.status(200).send([]);
    // res.send(200, data);
};


module.exports = function (app) {
  app.get('/comment', getComments);
  app.post('/comment', postComment);
  app.put('/comment', editComment);
  app.delete('/comment', deleteComment);
  app.post('/comment/like', like);
};