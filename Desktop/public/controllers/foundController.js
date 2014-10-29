angular.module('formApp')
.controller('foundController',['$scope','$http','restApi', function($scope,$http,restApi) {

var foundCtrl = this;
foundCtrl.foundItems = getFoundItems;
foundCtrl.status = {};



  getFoundItems(); 

  function getFoundItems() {
        restApi.getFoundItems()
            .success(function (data) {
              
                foundCtrl.foundItems = data.foundItems;
              })
            .error(function (error) {
                foundCtrl.status = 'Unable to load customer data: ' + error.message;
            });
    }
  


}]);