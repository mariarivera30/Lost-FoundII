angular.module('formApp')

.controller('adminUsersController',['$scope','$http','restApi', function($scope,$http,restApi) {

$scope.users
  getUser();  
	function getUser() {
        restApi.getUsers()
            .success(function (data) {
              
                $scope.users = data.users;
              })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    };
             
	
}]);
