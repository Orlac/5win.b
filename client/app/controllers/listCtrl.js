'use strict'

require('../services/apiService.js');
require('../services/pageService.js');
require('../directives/logoutButton.js');
require('../directives/commentForm.js');
require('../directives/commentItem.js');

angular.module('app.list', 
    ['app.apiService', 'app.pageService', 'app.logoutButton', 'app.commentItem', 'app.commentForm'])
    .controller('listCtrl', controller)
    .factory('listFactory', listFactory);

controller.$inject = ['pageService', 'listFactory', 'apiService'];
function controller(pageService, commentFactory, apiService){


    this.api = apiService;
    this.page = pageService;
    this.commentFactory = commentFactory;
    var self = this;

    this.init = function(){
        this.page.setTitle('Comments');
        this.page.ready = false;
        this.api.checkLogin()
            .then(function(){
                self.page.ready = true;
                self.commentFactory.load();

            })
            .catch(function(){
                self.page.goToState('signin');    
            });        
    }

} 

listFactory.$inject = ['apiService'];
function listFactory(apiService){

    this.api = apiService;
    this.post = {};
    this.posts = [];
    var self = this;

    this.isOwner = function(post){
        return post.uid == this.api.uid;
    }

    this.add = function(newPost){
        return this.api.createPost(newPost)
            .then(function(_post){
                self.posts.push(_post);
                self.post = {};
            });
    }

    this.like = function(post){
        return this.api.likePost({_id: post._id})
            .then(function(_post){
                post.likes = _post.likes;
            })
    }

    this.delete = function(post){
        return this.api.removePost({_id: post._id})
            .then(function(likes){
                var index = _.findIndex(self.posts, function(item) { 
                    return item.id == post.id 
                });
                if(index >= 0){
                    self.posts.splice(index, 1)
                }
            });
    }

    this.save = function(newPost, post){
        return this.api.editPost(newPost)
            .then(function(_post){
                post = _post;
            });
    }

    this.load = function(page){
        this.api.posts({page: page || 1})
            .then(function(data){
                self.posts = data;
            })
    }
    return this;
}