'use strict'

require('../services/apiService.js');

angular.module('application')
    .factory('commentFactory', commentFactory);

commentFactory.$inject = ['apiService', 'pageService'];
function commentFactory(apiService){



    this.api = apiService;
    this.posts = [];
    var self = this;

    this.load = function(page){
        this.api.posts({page: page || 1})
            .then(function(data){
                self.posts = data;
            })
    }



} 