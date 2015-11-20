'use strict'

angular.module('app.sortButtons', 
    [])
    .directive('sortButtons', sortButtons);

// logoutButton.$inject = ['apiService', 'pageService'];
function sortButtons(){


    return {
        restrict: 'EA',
        replace: true,
        scope: {
            sortModel: '=',
            sortTarget: '=',
            sortsData: '=',
            onSort: '&',
        },
        controller: controller,
        controllerAs: 'ctrl',
        template: require('ng-cache!../views/sortButtons.html')
    }
} 

controller.$inject = ['$scope', '$element', '$attrs', 'apiService', 'pageService'];
function controller($scope, $element, $attrs, apiService, pageService){

    this.click = function(key){
        $scope.onSort({sort: key});
    }

}