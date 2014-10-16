control.controller('SpecificmyitemsPageController', [ '$scope', '$state', function($scope, $state) {
    $scope.navTitle = 'myItems';

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            $scope.toggleMenu();
        }
    }];

}]);