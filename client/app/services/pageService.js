'use strict'

angular.module('app.pageService', 
    [])
    .service('pageService', pageService);

pageService.$inject = ['$window', '$state'];
function pageService($window, $state){

    this.ready = false;

    this.setTitle = function(text){
        $window.document.title =  text;
    }

    this.goToState = function(path){
    	$state.go(path);
    }
    
    return this;
} 