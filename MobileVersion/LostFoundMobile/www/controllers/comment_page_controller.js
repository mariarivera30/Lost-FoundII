control.controller('commentsPageController', [ '$scope', '$state', function($scope, $state) {
    $scope.comment_navTitle = 'Comments';

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            $scope.toggleMenu();
        }
    }];
}]);