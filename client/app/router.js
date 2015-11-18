'use strict'


require('./controllers/listCtrl.js');
require('./controllers/loginCtrl.js');
require('./services/pageService.js');

angular.module('app.router', 
    ['ui.router', 'app.list', 'app.login'])
    .config(configFn);

configFn.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
function configFn($locationProvider, $stateProvider, $urlRouterProvider){

    $urlRouterProvider.when('', '/');

    $urlRouterProvider.otherwise("/404");
    
    $stateProvider
    .state('list', {
        url: "/",
        template: require('ng-cache!./views/list.html'),
        // controller: 'listCtrl'
    })
    .state('signin', {
        url: "/login",
        template: require('ng-cache!./views/login.html'),
        // controller: 'loginCtrl'
    })
    .state('404', {
        url: "/404",
        template: require('ng-cache!./views/404.html'),
        controller: function(pageService) {
            pageService.setTitle('404');
        }
    });
}    