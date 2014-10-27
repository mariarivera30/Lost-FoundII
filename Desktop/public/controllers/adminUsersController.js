angular.module('formApp')

.controller('adminUsersController',['$scope','$http','restApi','shareData', function($scope,$http,restApi,shareData) {

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

 // we will store all of our form data in this object
 $scope.searchUserEmail = {};
  
  $scope.setValue = function(e) {
    $scope.searchUserEmail = e;
    shareData.searchUserEmail= e;
    getUserAdmin();
 
  }

function getUserAdmin(){
  restApi.getUserAdmin(shareData.searchUserEmail)
            .success(function (data) {
              
                $scope.users = data.anUser;
              })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });


};
           
	
}]);
