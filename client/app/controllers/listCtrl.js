'use strict'

require('../services/apiService.js');
require('../services/pageService.js');

angular.module('app.list', 
    ['app.apiService', 'app.pageService'])
    .controller('listCtrl', controller);

controller.$inject = ['apiService', 'pageService'];
function controller(apiService, pageService){


    this.api = apiService;
    this.page = pageService;
    this.posts = [];
    var self = this;
    
    this.logout = function(){
        this.api.logout()
            .then(function(){
                self.page.goToState('signin');    
            })
    }

    this.load = function(){
        this.api.posts({page: 1})
            .then(function(data){
                self.posts = data;
            })
    }

    this.init = function(){
        this.page.setTitle('Comments');
        this.page.ready = false;
        this.api.checkLogin()
            .then(function(){
                self.page.ready = true;
                self.load();

            })
            .catch(function(){
                self.page.goToState('signin');    
            });        
    }

} 