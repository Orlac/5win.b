'use strict'

require('../services/apiService.js');
require('../services/pageService.js');
require('../directives/logoutButton.js');
require('../directives/commentForm.js');
require('../directives/commentItem.js');
require('../directives/sortButtons.js');
// require('../directives/infiniteScroll.js');

// require('lr-infinite-scroll');

angular.module('app.list', 
    ['app.apiService', 'app.pageService', 'app.logoutButton', 'app.commentItem', 'app.commentForm', 'app.sortButtons', /*'app.infiniteScroll', */'lrInfiniteScroll'])
    .controller('listCtrl', controller)
    .factory('listFactory', listFactory);

controller.$inject = ['$scope', 'pageService', 'listFactory', 'apiService'];
function controller($scope, pageService, commentFactory, apiService){


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

    $scope.next = function(){
        return self.commentFactory.next();
    }

} 

listFactory.$inject = ['apiService'];
function listFactory(apiService){

    this.api = apiService;
    this.post = {};
    this.posts = [];
    this.curPage = 1;

    // this.sortData = {};
    this.sort = 'updated';
    this.sortTarget = -1;

    var self = this;

    this.isOwner = function(post){
        return post.uid == this.api.uid;
    }

    this.setSort = function(_sort){
        this.sort = _sort;
        this.sortTarget = -this.sortTarget;
        this.curPage = 1;
        self.posts = [];
        this.load(this.curPage);
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
            .then(function(){
                var index = _.findIndex(self.posts, function(item) { 
                    return item._id == post._id 
                });
                if(index >= 0){
                    self.posts.splice(index, 1)
                }
            });
    }

    this.save = function(newPost, post, index){
        return this.api.editPost(newPost)
            .then(function(_post){
                self.posts[index] = _post;
            });
    }

    this.next = function(){
        this.curPage++;
        return this.load(this.curPage);
    }

    this.load = function(page){
        this.api.posts({page: page || 1, sort: this.sort, target: this.sortTarget})
            .then(function(data){
                _.each(data, function(item){
                    self.posts.push(item);    
                })
                return self.posts;
                // return self.posts = data;
            })
    }
    return this;
}