control.controller('InfoPageController', [ '$scope', '$state', function($scope, $state) {
    $scope.navTitle = 'About Us';

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            $scope.toggleMenu();
        }
    }];
}]);