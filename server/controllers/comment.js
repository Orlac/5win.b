var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');  

var passport = require('passport');  

var getComments = function (req, res, next) {

  var page = req.query.page || 1;
  var sort = req.query.sort || 'updated';
  var target = (req.query.target || -1)*1;

  var sortObg = {};
  sortObg[sort] = target;

  console.log('sortObg', sortObg);

	mongoose.model('Comment')
		.find()
    .sort(sortObg)
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
  var Post = mongoose.model('Comment');

  var post = new Post(req.body);
  post.uid = req.user.id;
  post.save(function (err, _post) {
    if (err) {
      return res.status(400).send(err);
    }
    console.log('_post', _post);
    return res.status(200).send(post);
    
  });
};

var editComment = function (req, res, next) {
  if(!req.user){
    return res.status(403);
  }
  var Post = mongoose.model('Comment');
  var query  = Post.where({ _id: req.body._id, uid: req.user.id });
  query.findOne(function (err, post) {
    if (err) {
      return res.status(500).send(err);
    }
    
    if (!post) {
      return res.status(404).send(err);
    }
    post.text = req.body.text;
    console.log('post.text'. post);
    post.save(function (err, _post) {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send(_post);
    });
  });
};

var deleteComment = function (req, res, next) {
  if(!req.user){
    return res.status(403);
  }
  var Post = mongoose.model('Comment');

  Post.findOne({ _id: req.query._id, uid: req.user.id }).remove().exec(function (err, docs) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send({});
  });

};

var like = function (req, res, next) {
  if(!req.user){
    return res.status(403);
  }
  var Post = mongoose.model('Comment');
  var query  = Post.where({ _id: req.body._id });
  query.findOne(function (err, post) {
    if (err) {
      return res.status(500).send(err);
    }
    
    if (!post) {
      return res.status(404).send(err);
    }

    post.like(req.user.id);
    post.save(function (err, _post) {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send(post);
    });

  });
};


module.exports = function (app) {
  app.get('/comment', getComments);
  app.post('/comment', postComment);
  app.put('/comment', editComment);
  app.delete('/comment', deleteComment);
  app.post('/comment/like', like);
};