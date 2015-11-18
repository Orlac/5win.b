'use strict'

require('../services/apiService.js');
require('../services/pageService.js');

angular.module('app.login', 
    ['app.apiService', 'app.pageService'])
    .controller('loginCtrl', controller);

controller.$inject = ['apiService', 'pageService'];
function controller(apiService, pageService){


    this.api = apiService;
    this.page = pageService;
    this.errors = [];
    this.user = {
        username: null,
        password: null,
    };
    var self = this;

    

    this.init = function(){

        this.page.setTitle('Login');
        this.page.ready = false;
        this.api.checkLogin()
            .then(function(){
                self.page.goToState('list');    
            })
            .catch(function(){
                self.page.ready = true;
            });        
    }

    this.submit = function(){
        this.errors = [];
        this.api.login(this.user)
            .then(function(){
                self.page.goToState('list');    
            })
            .catch(function(res){
                self.errors = res.message? [res.message] : ['oops some bug...'];
            })

    }

} 