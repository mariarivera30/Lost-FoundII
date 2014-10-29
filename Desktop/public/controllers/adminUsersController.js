angular.module('formApp')

.controller('adminUsersController',['$scope','$http','restApi','shareData', function($scope,$http,restApi,shareData) {
  
  var userCtrl = this;
  userCtrl.users ={};
  userCtrl.searchUserEmail = {};
  userCtrl.status = {};
  userCtrl.setValue = setValue;


  // Invoke initialization.
  activate();

  // Initialization method for the controller.
  function activate()
  {
    getUser();
  };
  
	function getUser() {
        restApi.getUsers()
            .success(function (data) {
              
                userCtrl.users = data.users;
              })
            .error(function (error) {
                userCtrl.status = 'Unable to load customer data: ' + error.message;
            });
    }; 

 // we will store all of our form data in this object
   
  function setValue(e){
    userCtrl.searchUserEmail = e;
    getUserAdmin();
 
  }

  function getUserAdmin(){
    restApi.getUserAdmin(userCtrl.searchUserEmail)
            .success(function (data) {
              
                userCtrl.users = data.anUser;
              })
            .error(function (error) {
                userCtrl.status = 'Unable to load customer data: ' + error.message;
            });

};
           
	
}]);
