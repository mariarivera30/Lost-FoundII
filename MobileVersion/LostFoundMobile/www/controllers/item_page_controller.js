control.controller('itemPageController', [ '$scope', '$state','shareData', function($scope, $state, shareData) {
    $scope.item_navTitle = 'Item';

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            $scope.toggleMenu();
        }
    }];
    $scope.rightButtons = [{
        type: 'button-icon icon ion-arrow-left-c',
        tap: function(e) {
            window.history.back();
        }
    }];

    $scope.item = shareData.selectedItem;

}]);