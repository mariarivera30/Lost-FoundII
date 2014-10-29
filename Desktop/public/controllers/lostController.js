angular.module('formApp')
.controller('lostController',['$scope','$http','restApi', function($scope,$http,restApi) {

var lostCtrl = this;
lostCtrl.lostItems = getLostItems;
lostCtrl.status = {};


  getLostItems();  
  function getLostItems() {
        restApi.getLostItems()
            .success(function (data) {
              
                lostCtrl.lostItems = data.lostItems;
              })
            .error(function (error) {
                lostCtrl.status = 'Unable to load customer data: ' + error.message;
            });
    }
  
}]);