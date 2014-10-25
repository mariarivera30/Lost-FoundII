angular.module('formApp')
.controller('adminItemsController',['$scope','$http','restApi', 'shareData' , function($scope,$http,restApi,shareData) {

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
 $scope.commentofitem = {};
  
  $scope.setValue = function(e) {
    $scope.commentofitem = e;
    shareData.commentofitem= e;

 
  }

}]);