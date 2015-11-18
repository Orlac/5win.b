'use strict'

angular.module('app.apiService', 
    ['ngResource'])
    
    .factory('userFactory', userFactory)
    .factory('commentFactory', commentFactory)
    .service('apiService', apiService);

userFactory.$inject = ['$resource'];
function userFactory($resource){
    return $resource('/user', {}, {
        query: {method: 'GET' },
        login: {method: 'POST', /*params: {login: '@login', password: '@login'},*/  },
        logout: {method: 'POST', url: '/user/logout' }
    });
}

commentFactory.$inject = ['$resource'];
function commentFactory($resource){
    return $resource('/comment', {}, {
        query: {method: 'GET', params: {page: '@page'}, isArray: true },
        post: {method: 'POST', /*params: {text: '@text'},*/ isArray: true },
        edit: {method: 'PUT', /*params: {id: '@id', text: '@text'},*/  },
        remove: {method: 'DELETE', params: {id: '@id'} },
        like: {method: 'POST', /*params: {id: '@id'},*/ url: '/comment/like' }
    });    
}

apiService.$inject = ['$q', 'userFactory', 'commentFactory'];
function apiService($q, userFactory, commentFactory){

    this.userFactory = userFactory;
    this.commentFactory = commentFactory;

    /**
     * check is no auth user
     * @return $promise
     */
    // this.checkNoLogin = function(){
    //     var deferred = $q.defer();
    //     return this.userFactory.query()
    //         .$promise
    //         .then(function(){
    //             deferred.reject('is auth');
    //         })
    //         .catch(function(){
    //             deferred.resolve();
    //         });
    //     return deferred.promise;
    // }

    /**
     * check is auth user
     * @return $promise
     */
    this.checkLogin = function(){
        return this.userFactory.query().$promise;
    }

    /**
     * auth user
     * @param  {login: '', password: ''}
     * @return $promise
     */
    this.login = function(data){
        return this.userFactory.login(data).$promise;
    }

    /**
     * logout user
     * @return $promise
     */
    this.logout = function(){
        return this.userFactory.logout().$promise;
    }

    /**
     * post create
     * @param  {text: text}
     * @return $promise
     */
    this.createPost = function(data){
        return this.commentFactory.post(data).$promise;
    }

    /**
     * edit post
     * @param  {text: text, id: id}
     * @return $promise
     */
    this.editPost = function(data){
        return this.commentFactory.edit(data).$promise;
    }

    /**
     * remove Post
     * @param  {id: id}
     * @return $promise
     */
    this.removePost = function(data){
        return this.commentFactory.remove(data).$promise;
    }    

    /**
     * like/dislike Post
     * @param  {id: id}
     * @return $promise
     */
    this.likePost = function(data){
        return this.commentFactory.like(data).$promise;
    } 

    this.posts = function(data){
        return this.commentFactory.query(data).$promise;
    } 

    return this;
} 