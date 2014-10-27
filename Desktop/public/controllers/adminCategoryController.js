angular.module('formApp')
.controller('adminCategoryController',['$scope','$http','restApi','$state', function($scope,$http,restApi,$state) {

$scope.list ={
  email: " "
};


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
// $scope.loadData = function(){
//   getCategories();
// };
 $scope.postCategories = function(newCategory) {
        restApi.postCategories(newCategory)

          .success(function (data) {
               
               
              })
            .error(function (error) {
                $scope.status = 'Unable to post customer data: ' + error.message;
            });
      $state.reload();
    };
$scope.deleteCat
 $scope.deleteCategory = function() {
        alert($scope.deleteCat);
        restApi.deleteCategory($scope.deleteCat)

          .success(function (data) {
               
               
              })
            .error(function (error) {
                $scope.status = 'Unable to post customer data: ' + error.message;
            });
      
    }; 

    $scope.setValue = function(id){
     
      $scope.deleteCat = id;
      
      


    } ;

           
	
}]);