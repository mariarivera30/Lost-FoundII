control.controller('homePageController', [ '$scope', '$state', function($scope, $state) {

    $scope.navTitle = 'Lost/Found';
    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            $scope.toggleMenu();
        }
    }];
    $scope.rightButtons = [{
        type: 'button-icon icon ion-paper-airplane',
        tap: function(e) {
            $state.go('main.reportitem1');
        }
    }];



}]);