angular.module('formApp')
.controller('foundController',['$scope','$http','restApi', function($scope,$http,restApi) {

$scope.foundItems
  getFoundItems();  
  function getFoundItems() {
        restApi.getFoundItems()
            .success(function (data) {
              
                $scope.foundItems = data.foundItems;
              })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
  // we will store all of our form data in this object


}]);