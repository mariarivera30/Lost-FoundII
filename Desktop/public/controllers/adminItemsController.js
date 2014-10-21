angular.module('formApp')
.controller('adminItemsController',['$scope','$http','restApi', function($scope,$http,restApi) {

$scope.items
  getItems();  
  function getItems() {
        restApi.getItems()
            .success(function (data) {
              
                $scope.items = data.items;
              })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
  // we will store all of our form data in this object


}]);