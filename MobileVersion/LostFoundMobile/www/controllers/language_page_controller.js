control.controller('langPageController', [ '$scope', '$state', function($scope, $state) {
    $scope.navTitle = 'Language';

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            $scope.toggleMenu();
        }
    }];

}]);