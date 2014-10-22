angular.module('formApp')
.controller('lostController',['$scope','$http','restApi', function($scope,$http,restApi) {

$scope.lostItems
  getLostItems();  
  function getLostItems() {
        restApi.getLostItems()
            .success(function (data) {
              
                $scope.lostItems = data.lostItems;
              })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
  // we will store all of our form data in this object


}]);