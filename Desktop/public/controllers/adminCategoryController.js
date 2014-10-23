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

 $scope.postCategories = function(newCategory) {
        restApi.postCategories(newCategory)
          .success(function (data) {
                $route.reload();
                getCategories(); 
              })
            .error(function (error) {
                $scope.status = 'Unable to post customer data: ' + error.message;
            });
    };
          
	
}]);