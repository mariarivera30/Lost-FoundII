control.controller('commentsPageController', [ '$scope', '$state', function($scope, $state) {
    $scope.navTitle = 'Comments';

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            $scope.toggleMenu();
        }
    }];
}]);