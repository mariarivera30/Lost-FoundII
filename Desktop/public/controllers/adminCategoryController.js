angular.module('formApp')
.controller('adminCategoryController',['$scope','$http','restApi', function($scope,$http,restApi) {

$scope.categories
  getCategories();  
	function getCategories() {
        restApi.getCategories()
            .success(function (data) {
              
                $scope.categories = data.categories;
              })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    };
$scope.hi
 $scope.postCategories = function(hi) {
  alert(hi);
        restApi.postCategories(hi)
        // $scope.categories = data.categories;
            .success(function (data) {
                
                console.log('Hicistes el Post')
                //$state.go()
              })
            .error(function (error) {
                $scope.status = 'Unable to post customer data: ' + error.message;
            });
    };
          
	
}]);