angular.module('formApp').controller('LoginCtrl', ['$scope','$location','$rootScope','restApi' ,function($scope, $location, $rootScope,restApi) {
 var LG= this;
var credentials ={};

  LG.login = function(username,password) {
  	 credentials = {'email':username,'key':password};
  	var response ={};
 	restApi.getAuth(credentials).success(function (data) {
              response =data.user;
                
              })
            .error(function (error) {
                LG.status = 'Unable to load customer data: ' + error.message;
            });

if (response.username === credentials.username)
        $rootScope.loggedInUser = true;


    
    
  };
}]);