/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var paginator = require('mongoose-pagination');
var Schema = mongoose.Schema;
var _ = require('lodash');

/**
 * User schema
 */

var CommentSchema = new Schema({
  text: { 
  	type: String, 
  	validate: {
      validator: function(v) {
        return v.length > 0 && v.length < 140;
      },
      message: 'message is not a valid! length must be 1-140 '
    } 
  },
  updated: { type: Date, default: Date.now },
  likes: { type: Number },
  userLikes: [Number],
});


// CommentSchema.plugin(paginator);


/**
 * Methods
 */

CommentSchema.method('getIsLikeUser', function(uid){
	return _.indexOf(this.userLikes, uid) > 0; 
});

CommentSchema.method('like', function(uid){
	if(this.getIsLikeUser(uid)){
		this.likes--;
		this.userLikes.splice(_.indexOf(this.userLikes, uid), 1);
	}else{
		this.likes++;
		this.userLikes.push(uid);
	}
});

/**
 * Statics
 */

CommentSchema.static({

});

/**
 * Register
 */

mongoose.model('Comment', CommentSchema);