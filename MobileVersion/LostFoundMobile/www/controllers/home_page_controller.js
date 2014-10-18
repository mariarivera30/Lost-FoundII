control.controller('homePageController', [ '$scope', '$state','$http','restApi', function($scope, $state,$http,restApi) {

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

   $scope.itemsMaria

  getItems();  
    function getItems() {
        restApi.getItems()
            .success(function (data) {
              
                $scope.itemsMaria = data.items;
              })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }



}]);