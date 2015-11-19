'use strict'

angular.module('app.commentForm', 
    [])
    .directive('commentForm', commentForm);

// logoutButton.$inject = ['apiService', 'pageService'];
function commentForm(){


    return {
        restrict: 'EA',
        replace: true,
        scope: {
            onPost: '&',
            post: '='
        },
        controller: controller,
        controllerAs: 'ctrl',
        template: function(elem, attr){
            var tpls = {
                edit: require('ng-cache!../views/commentFormEdit.html'),
                add: require('ng-cache!../views/commentFormAdd.html'),
            };
            return tpls[attr.template];
        },
        // template: require('ng-cache!../views/commentForm.html')
    }
} 

controller.$inject = ['$scope', '$element', '$attrs', '$timeout'];
function controller($scope, $element, $attrs, $timeout){

    $scope.newPost = angular.copy($scope.post);

    this.post = function(){
        $scope.onPost({ newPost: $scope.newPost, post: $scope.post })
            .then(function(){
                $scope.newPost = {};                
            })
            .catch(function(err){
                $scope.isError = true;
                $timeout(function(){
                    $scope.isError = false;
                }, 5000);
            })
    }

}