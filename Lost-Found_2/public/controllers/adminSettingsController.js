angular.module('formApp')
.controller('adminSettingsController',['$scope','$http','restApi', function($scope,$http,restApi) {
var settingCtrl = this;
settingCtrl.firstname ="";
settingCtrl.userObject={};


$scope.users
  getUser();  

  settingCtrl.getUserObject = function (object){
   settingCtrl.userObject=object;
   settingCtrl.userObject.isblocked='false';
   settingCtrl.userObject.isadmin='true';
    settingCtrl.userObject.passkey=123;
   postUser(object);
  };

  function postUser(object) {
        
        restApi.postUser(object)
            .success(function (data) {
              alert('good');
              })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    };

	function getUser() {
        restApi.getUsers()
            .success(function (data) {
              
                settingCtrl.users = data.users;
              })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    };






             
	
}]);