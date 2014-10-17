control.controller('myitems1PageController', [ '$scope', '$state', function($scope, $state) {
    $scope.myItem_navTitle = 'myItem';

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            $scope.toggleMenu();
        }
    }];
}]);
control.controller('myitems2PageController', [ '$scope', '$state', function($scope, $state) {
    $scope.myItem_navTitle = 'myItems';

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            $scope.toggleMenu();
        }
    }];
}]);