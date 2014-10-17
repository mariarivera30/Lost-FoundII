control.controller('reportitem1PageController', [ '$scope', '$state', function($scope, $state) {
    $scope.report_navTitle = 'Report Item';

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            $scope.toggleMenu();
        }
    }];
}]);
control.controller('reportitem2PageController', [ '$scope', '$state',  function($scope, $state) {
    $scope.report_navTitle = 'Report Item';

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            $scope.toggleMenu();

        }
    }];
    $scope.rightButtons = [{
        type: 'button-icon icon ion-ios7-upload-outline',
        tap: function(e) {
            $state.go('entry');
        }
    }];

}]);