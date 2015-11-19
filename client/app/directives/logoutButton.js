'use strict'

require('../services/apiService.js');
require('../services/pageService.js');

angular.module('app.logoutButton', 
    ['app.apiService', 'app.pageService'])
    .directive('logoutButton', logoutButton);

// logoutButton.$inject = ['apiService', 'pageService'];
function logoutButton(/*apiService, pageService*/){


    return {
        restrict: 'EA',
        replace: true,
        scope: {},
        controller: controller,
        controllerAs: 'ctrl',
        template: require('ng-cache!../views/logoutButton.html')
    }
} 

controller.$inject = ['$scope', '$element', '$attrs', 'apiService', 'pageService'];
function controller($scope, $element, $attrs, apiService, pageService){

    this.logout = function(){
        apiService.logout()
            .then(function(){
                pageService.goToState('signin');    
            })
    }

}
