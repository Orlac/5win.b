'use strict'

angular.module('app.commentItem', 
    [])
    .directive('commentItem', commentItem);

// logoutButton.$inject = ['apiService', 'pageService'];
function commentItem(/*apiService, pageService*/){


    return {
        restrict: 'EA',
        replace: true,
        scope: {
            onLike: '&',
            onDelete: '&',
            onEdit: '&',
            isOwner: '=',
            post: '='
        },
        controller: controller,
        controllerAs: 'ctrl',
        template: require('ng-cache!../views/commentItem.html')
    }
} 

controller.$inject = ['$scope', '$element', '$attrs'];
function controller($scope, $element, $attrs){

    this.isEdit = false;

    this.canDelete = function(){
        return $scope.isOwner;
    }

    this.canEdit = function(){
        return $scope.isOwner;
    }

    this.delete = function(){
        $scope.onDelete({post: $scope.post});
    }

    this.edit = function(newPost){
        return $scope.onEdit({newPost: newPost})
            .then(function(){
                this.isEdit = false;
            });
    }

    this.like = function(){
        $scope.onLike({post: $scope.post});
    }

    

}